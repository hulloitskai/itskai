# typed: true
# frozen_string_literal: true

class JournalService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def enabled?
      return !!@enabled if defined?(@enabled)
      @enabled = !!(super && notion_ready? && database_id.present?)
    end

    # == Methods
    sig do
      params(
        published: T.nilable(T::Boolean),
        options: T.untyped,
      ).returns(T.untyped)
    end
    def list_entries(published: nil, **options)
      checked do
        instance.list_entries(
          published:,
          **options,
        )
      end
    end

    sig { params(entry_id: String, options: T.untyped).returns(T.untyped) }
    def list_comments(entry_id:, **options)
      checked do
        instance.list_comments(**T.unsafe({
          entry_id:,
          **options,
        }))
      end
    end

    sig { params(entry_id: String).returns(T.untyped) }
    def retrieve_entry(entry_id:) = instance.retrieve_entry(entry_id:)

    sig { params(entry: T.untyped).returns(T::Array[T.untyped]) }
    def retrieve_blocks(entry:) = instance.retrieve_blocks(entry:)

    sig { params(entry_id: String, text: String).returns(T.untyped) }
    def create_comment(entry_id:, text:)
      checked do
        instance.create_comment(
          entry_id:,
          text:,
        )
      end
    end

    # == Helpers
    sig { returns(T.nilable(String)) }
    def database_id
      return @database_id if defined?(@database_id)
      @database_id = ENV["JOURNAL_DATABASE_ID"]
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

  # == Methods
  sig do
    params(
      published: T.nilable(T::Boolean),
      options: T.untyped,
    ).returns(T.untyped)
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
    client.database_query(database_id:, **options)
  end

  sig { params(entry_id: String, options: T.untyped).returns(T.untyped) }
  def list_comments(entry_id:, **options)
    client.retrieve_comments(block_id: entry_id, **options)
  end

  sig { params(entry_id: String).returns(T.untyped) }
  def retrieve_entry(entry_id:)
    client.page(page_id: entry_id)
  end

  sig { params(entry: T.untyped).returns(T::Array[T.untyped]) }
  def retrieve_blocks(entry:)
    Rails.cache.fetch(
      "journal/entry_blocks:#{entry.id}",
      expires_in: 10.minutes,
      race_condition_ttl: 10.seconds,
    ) do
      redactor = Redactor.new(entry)
      message = client.block_children(block_id: entry.id)
      message.results.tap { |blocks| redactor.redact_blocks!(blocks) }
    end
  end

  sig { params(entry_id: String, text: String).returns(T.untyped) }
  def create_comment(entry_id:, text:)
    client.create_comment(
      parent: {
        page_id: entry_id,
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
  sig { returns(String) }
  def database_id
    T.must(self.class.database_id)
  end
end
