# typed: strict
# frozen_string_literal: true

class NotionClient < ApplicationService
  include Singleton

  # == Initializer
  sig { void }
  def initialize
    super
    @client = T.let(
      Notion.config.token ? Notion::Client.new : nil,
      T.nilable(Notion::Client),
    )
  end

  # == Attributes
  sig { returns(T.nilable(Notion::Client)) }
  attr_reader :client

  sig { returns(Notion::Client) }
  def client!
    client or raise "Notion client not initialized"
  end

  # == Pages
  sig { params(database_id: String, options: T.untyped).returns(T.untyped) }
  def self.list_pages(database_id, **options)
    results = T.let([], T::Array[T.untyped])
    instance.client!.database_query(database_id:, **options) do |page|
      results.concat(page.results)
    end
    results
  end

  sig { params(id: String).returns(T.untyped) }
  def self.retrieve_page(id)
    instance.client!.page(page_id: id)
  end

  sig { params(id: String).returns(T::Array[T.untyped]) }
  def self.retrieve_page_content(id)
    recursively_retrieve_blocks(id)
  end

  sig { params(database_id: String, name: String).returns(T.untyped) }
  def self.create_page(database_id, name:)
    instance.client!.create_page(
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

  # == Comments
  sig do
    params(page_id: String, options: T.untyped).returns(T.untyped)
  end
  def self.list_comments(page_id, **options)
    results = T.let([], T::Array[T.untyped])
    instance.client!.retrieve_comments(block_id: page_id, **options) do |page|
      results.concat(page.results)
    end
    results
  end

  sig { params(page_id: String, text: String).returns(T.untyped) }
  def self.create_comment(page_id, text:)
    instance.client!.create_comment(
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

  # == Helpers

  sig { params(parent_block_id: String).returns(T::Array[T.untyped]) }
  private_class_method def self.recursively_retrieve_blocks(parent_block_id)
    message = instance.client!.block_children(block_id: parent_block_id)
    blocks = T.let(message.results, T::Array[T.untyped])
    blocks.each do |block|
      if block["has_children"]
        block["children"] = recursively_retrieve_blocks(block.id)
      end
    end
    blocks
  end
end
