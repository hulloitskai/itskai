# typed: true
# frozen_string_literal: true

class NotionService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def enabled?
      return !!@enabled if defined?(@enabled)
      @enabled = T.let(@enabled, T.nilable(T::Boolean))
      @enabled = T.let(super, T::Boolean) && Notion.config.token.present?
    end

    # == Methods
    sig do
      params(
        published: T.nilable(T::Boolean),
        options: T.untyped,
      ).returns(T.untyped)
    end
    def list_journal_entries(
      published: nil,
      **options
    ) = instance.journal_entries(
      published:,
      **options,
    )

    sig { params(entry_id: String, options: T.untyped).returns(T.untyped) }
    def list_journal_entry_comments(
      entry_id:,
      **options
    ) = instance.list_journal_entry_comments(**T.unsafe({
      entry_id:,
      **options,
    }))

    sig { params(page: T.untyped).returns(T::Array[T.untyped]) }
    def retrieve_page_blocks(page:) = instance.retrieve_page_blocks(page:)

    sig { params(entry_id: String, text: String).returns(T.untyped) }
    def create_journal_entry_comment(
      entry_id:,
      text:
    ) = instance.create_journal_entry_comment(
      entry_id:,
      text:,
    )
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Notion::Client.new, Notion::Client)
  end

  # == Attributes
  sig { returns(Notion::Client) }
  attr_reader :client

  # == Methods
  sig do
    params(
      published: T.nilable(T::Boolean),
      options: T.untyped,
    ).returns(T.untyped)
  end
  def journal_entries(published: nil, **options)
    database_id = ENV.fetch("NOTION_JOURNAL_DATABASE_ID")
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
  def list_journal_entry_comments(entry_id:, **options)
    client.retrieve_comments(block_id: entry_id, **options)
  end

  sig { params(page: T.untyped).returns(T::Array[T.untyped]) }
  def retrieve_page_blocks(page:)
    Rails.cache.fetch(
      "notion/page_blocks:#{page.id}",
      expires_in: 10.minutes,
      race_condition_ttl: 10.seconds,
    ) do
      redactor = PageRedactor.new(page)
      message = client.block_children(block_id: page.id)
      message.results.tap { |blocks| redactor.redact_blocks!(blocks) }
    end
  end

  sig { params(entry_id: String, text: String).returns(T.untyped) }
  def create_journal_entry_comment(
    entry_id:,
    text:
  )
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
end
