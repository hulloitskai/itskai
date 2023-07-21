# typed: true
# frozen_string_literal: true

class ActionItemsService < ApplicationService
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
      @database_id = ENV["ACTION_ITEMS_DATABASE_ID"]
    end

    # == Methods
    sig { params(name: String).returns(T.untyped) }
    def create_page(name:)
      checked { instance.create_page(name:) }
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

  # == Methods
  sig { params(name: String).returns(T.untyped) }
  def create_page(name:)
    client.create_page(
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

  private

  # == Attributes
  sig { returns(Notion::Client) }
  attr_reader :client
end
