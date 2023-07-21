# typed: true
# frozen_string_literal: true

class JournalService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def disabled?
      return @disabled if defined?(@disabled)
      @disabled = super || !notion_ready? || database_id.blank?
    end

    # == Accessors
    sig { returns(T.nilable(String)) }
    def database_id
      return @database_id if defined?(@database_id)
      @database_id = ENV["JOURNAL_DATABASE_ID"]
    end

    # == Methods: Sync
    sig { void }
    def sync
      checked { instance.sync }
    end

    sig { void }
    def sync_later
      SyncJournalJob.perform_later
    end

    # == Methods
    sig do
      params(published: T.nilable(T::Boolean), options: T.untyped)
        .returns(T::Array[T.untyped])
    end
    def list_pages(published: nil, **options)
      checked { instance.list_pages(published:, **options) }
    end

    sig do
      params(page_id: String, options: T.untyped)
        .returns(T::Array[T.untyped])
    end
    def list_comments(page_id, **options)
      checked { instance.list_comments(page_id, **options) }
    end

    sig { params(page_id: String).returns(T.untyped) }
    def retrieve_page(page_id)
      checked { instance.retrieve_page(page_id) }
    end

    sig { params(page_id: String).returns(T::Array[T.untyped]) }
    def retrieve_blocks(page_id)
      checked { instance.retrieve_blocks(page_id) }
    end

    sig { params(page_id: String, text: String).returns(T.untyped) }
    def create_comment(page_id, text:)
      checked { instance.create_comment(page_id, text:) }
    end

    private

    # == Helpers
    sig { returns(T::Boolean) }
    def notion_ready? = Notion.config.token.present?
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Notion::Client.new, Notion::Client)
  end

  # == Accessors
  sig { returns(String) }
  def database_id
    self.class.database_id or raise "Missing database ID"
  end

  # == Methods: Sync
  sig { void }
  def sync
    pages = list_pages(published: true)
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
  def list_pages(published: nil, **options)
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
    client.database_query(database_id:, **options) do |page|
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
    client.retrieve_comments(block_id: page_id, **options) do |page|
      results.concat(page.results)
    end
    results
  end

  sig { params(page_id: String).returns(T.untyped) }
  def retrieve_page(page_id)
    client.page(page_id:)
  end

  sig { params(page_id: String).returns(T::Array[T.untyped]) }
  def retrieve_blocks(page_id)
    page = retrieve_page(page_id)
    redactor = Redactor.new(page)
    recursively_retrieve_blocks(page_id, redactor:)
  end

  sig { params(page_id: String, text: String).returns(T.untyped) }
  def create_comment(page_id, text:)
    client.create_comment(
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

  # == Attributes
  sig { returns(Notion::Client) }
  attr_reader :client

  # == Helpers
  sig do
    params(parent_block_id: String, redactor: Redactor)
      .returns(T::Array[T.untyped])
  end
  def recursively_retrieve_blocks(parent_block_id, redactor:)
    message = client.block_children(block_id: parent_block_id)
    message.results.tap do |blocks|
      blocks = T.let(blocks, T::Array[T.untyped])
      redactor.redact_blocks!(blocks)
      blocks.each do |block|
        if block["has_children"]
          block["children"] = recursively_retrieve_blocks(block.id, redactor:)
        end
      end
    end
  end
end
