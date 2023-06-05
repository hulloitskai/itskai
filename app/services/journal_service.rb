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

  sig do
    params(page_id: String, cached: T::Boolean).returns(T::Array[T.untyped])
  end
  def retrieve_blocks(page_id, cached: !Rails.env.development?)
    if cached
      Rails.cache.fetch(
        "journal/blocks:#{page_id}",
        expires_in: 10.minutes,
        race_condition_ttl: 10.seconds,
      ) do
        retrieve_blocks_uncached(page_id)
      end
    else
      retrieve_blocks_uncached(page_id)
    end
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
  sig { returns(String) }
  def database_id
    T.must(self.class.database_id)
  end

  sig { params(page_id: String).returns(T::Array[T.untyped]) }
  def retrieve_blocks_uncached(page_id)
    page = retrieve_page(page_id)
    redactor = Redactor.new(page)
    message = client.block_children(block_id: page_id)
    message.results.tap { |blocks| redactor.redact_blocks!(blocks) }
  end
end
