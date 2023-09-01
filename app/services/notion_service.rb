# typed: strict
# frozen_string_literal: true

class NotionService < ApplicationService
  class << self
    # == Lifecycle
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = !notion_available? || super
    end

    # == Methods
    sig { returns(Notion::Client) }
    def client
      checked { instance.client }
    end

    sig do
      params(database_id: String, options: T.untyped)
        .returns(T::Array[T.untyped])
    end
    def list_pages(database_id, **options)
      results = T.let([], T::Array[T.untyped])
      client.database_query(database_id: database_id, **options) do |page|
        results.concat(page.results)
      end
      results
    end

    sig do
      params(page_id: String, options: T.untyped).returns(T::Array[T.untyped])
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
    def retrieve_content(page_id)
      recursively_retrieve_blocks(page_id)
    end

    sig { params(database_id: String, name: String).returns(T.untyped) }
    def create_page(database_id, name:)
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

    # == Helpers
    sig { returns(T::Boolean) }
    def notion_available? = Notion.config.token.present?

    sig { params(parent_block_id: String).returns(T::Array[T.untyped]) }
    def recursively_retrieve_blocks(parent_block_id)
      message = client.block_children(block_id: parent_block_id)
      blocks = T.let(message.results, T::Array[T.untyped])
      blocks.each do |block|
        if block["has_children"]
          block["children"] = recursively_retrieve_blocks(block.id)
        end
      end
      blocks
    end
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
end
