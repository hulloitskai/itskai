# typed: true
# frozen_string_literal: true

class JournalEntriesService < ApplicationService
  class << self
    # == Lifecycle
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = !notion_available? || database_id.nil? || super
    end

    # == Settings
    sig { returns(T.nilable(String)) }
    def database_id
      setting("DATABASE_ID")
    end

    # == Synchronization
    sig { void }
    def sync
      checked { instance.sync }
    end

    sig { void }
    def sync_later
      SyncJournalEntriesJob.perform_later
    end

    # == Methods
    sig do
      params(published: T.nilable(T::Boolean), options: T.untyped)
        .returns(T::Array[T.untyped])
    end
    def list_entries(published: nil, **options)
      checked { instance.list_entries(published:, **options) }
    end

    sig do
      params(page_id: String, options: T.untyped)
        .returns(T::Array[T.untyped])
    end
    def list_comments(page_id, **options)
      checked { instance.list_comments(page_id, **options) }
    end

    sig { params(page_id: String).returns(T.untyped) }
    def retrieve_entry(page_id)
      checked { instance.retrieve_entry(page_id) }
    end

    sig { params(page_id: String).returns(T::Array[T.untyped]) }
    def retrieve_entry_content(page_id)
      checked { instance.retrieve_entry_content(page_id) }
    end

    sig { params(page_id: String, text: String).returns(T.untyped) }
    def create_comment(page_id, text:)
      checked { instance.create_comment(page_id, text:) }
    end

    private

    # == Helpers
    sig { returns(T::Boolean) }
    def notion_available? = Notion.config.token.present?
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Notion::Client.new, Notion::Client)
  end

  # == Settings
  sig { returns(String) }
  def database_id
    self.class.database_id or raise "Database ID not set"
  end

  # == Synchronization
  sig { void }
  def sync
    pages = list_entries(published: true)
    pages.each do |page|
      notion_page_id = page.id
      Rails.error.handle(context: { notion_page_id: }) do
        entry = JournalEntry.find_or_initialize_by(notion_page_id:)
        entry.import_attributes_from_notion(page:)
        entry.save!
      rescue => error
        tag_logger do
          logger.error(
            "Failed to import entry with Notion page ID " \
              "`#{notion_page_id}'`: #{error}",
          )
        end
        raise error
      end
    end
    JournalEntry.where.not(notion_page_id: pages.map(&:id)).destroy_all
  end

  # == Methods
  sig do
    params(published: T.nilable(T::Boolean), options: T.untyped)
      .returns(T::Array[T.untyped])
  end
  def list_entries(published: nil, **options)
    filter = T.let(nil, T.nilable(T::Hash[String, T.untyped]))
    unless published.nil?
      filter = {
        "property" => "Published",
        "checkbox" => {
          "equals" => published,
        },
      }
    end
    sorts = T.let([{
      "timestamp" => "created_time",
      "direction" => "descending",
    }], T::Array[T::Hash[String, T.untyped]])
    options = { filter:, sorts:, **options }.compact
    results = T.let([], T::Array[T.untyped])
    @client.database_query(database_id:, **options) do |page|
      results.concat(page.results)
    end
    results
  end

  sig do
    params(page_id: String, options: T.untyped)
      .returns(T::Array[T.untyped])
  end
  def list_comments(page_id, **options)
    results = T.let([], T::Array[T.untyped])
    @client.retrieve_comments(block_id: page_id, **options) do |page|
      results.concat(page.results)
    end
    results
  end

  sig { params(page_id: String).returns(T.untyped) }
  def retrieve_entry(page_id)
    @client.page(page_id:)
  end

  sig { params(page_id: String).returns(T::Array[T.untyped]) }
  def retrieve_entry_content(page_id)
    page = retrieve_entry(page_id)
    redactor = Redactor.new(page)
    recursively_retrieve_blocks(page_id, redactor:)
  end

  sig { params(page_id: String, text: String).returns(T.untyped) }
  def create_comment(page_id, text:)
    @client.create_comment(
      parent: {
        page_id:,
      },
      rich_text: [{
        text: {
          content: text,
        },
      }],
    )
  end

  private

  # == Helpers
  sig do
    params(parent_block_id: String, redactor: Redactor)
      .returns(T::Array[T.untyped])
  end
  def recursively_retrieve_blocks(parent_block_id, redactor:)
    message = @client.block_children(block_id: parent_block_id)
    blocks = T.let(message.results, T::Array[T.untyped])
    redactor.redact_blocks!(blocks)
    blocks.each do |block|
      if block["has_children"]
        block["children"] = recursively_retrieve_blocks(block.id, redactor:)
      end
    end
    blocks
  end
end
