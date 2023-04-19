# typed: true
# frozen_string_literal: true

class NotionService < ApplicationService
  class << self
    # == Methods: Service
    sig { override.returns(T::Boolean) }
    def enabled?
      return !!@enabled if defined?(@enabled)
      @enabled = T.let(@enabled, T.nilable(T::Boolean))
      @enabled = T.let(super, T::Boolean) && Notion.config.token.present?
    end

    # == Methods
    sig { returns(Notion::Client) }
    def client = instance.client

    sig do
      params(
        published: T.nilable(T::Boolean),
        page_size: T.nilable(Integer),
        start_cursor: T.nilable(String),
      ).returns(T.untyped)
    end
    def entries(
      published: nil,
      page_size: nil,
      start_cursor: nil
    ) = instance.journal_entries(published:, page_size:, start_cursor:)
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Notion::Client.new, Notion::Client)
  end

  # == Methods
  sig { returns(Notion::Client) }
  attr_reader :client

  sig do
    params(
      published: T.nilable(T::Boolean),
      page_size: T.nilable(Integer),
      start_cursor: T.nilable(String),
    ).returns(T.untyped)
  end
  def journal_entries(published: nil, page_size: nil, start_cursor: nil)
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
    options = { filter:, sorts:, start_cursor:, page_size: }.compact
    client.database_query(database_id:, **options)
  end
end
