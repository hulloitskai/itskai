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
      ).returns(T::Array[T::Hash[String, T.untyped]])
    end
    def entries(published: nil) = instance.entries(published:)
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
    ).returns(T::Array[T::Hash[String, T.untyped]])
  end
  def entries(published: nil)
    @entries = T.let(@entries, T.nilable(T::Array[T::Hash[String, T.untyped]]))
    @entries ||= scoped do
      database_id = ENV.fetch("NOTION_ENTRIES_DATABASE_ID")
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
      data = client.database_query(database_id:, filter:, sorts:)
      data["results"]
    end
  end
end
