# typed: true
# frozen_string_literal: true

class AvailabilityService < ApplicationService
  class << self
    # == Lifecycle
    sig { override.returns(T::Boolean) }
    def disabled?
      !notion_available? || database_id.nil? || super
    end

    # == Settings
    sig { returns(T.nilable(String)) }
    def database_id
      setting("DATABASE_ID")
    end

    # == Methods
    sig { params(name: String).returns(T.untyped) }
    def create_item(name:)
      checked { instance.create_item(name:) }
    end

    private

    # == Helpers
    sig { returns(T::Boolean) }
    def notion_available?
      Notion.config.token.present?
    end
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

  # == Methods
  sig { params(name: String).returns(T.untyped) }
  def create_item(name:)
    @client.create_page(
      parent: {
        database_id:,
      },
      properties: {
        "Name" => {
          "title" => [{
            "text" => {
              "content" => name,
            },
          }],
        },
      },
    )
  end
end
