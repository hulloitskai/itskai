# typed: strict
# frozen_string_literal: true

class NotionClient < ApplicationService
  include Singleton

  # == Initializer
  sig { void }
  def initialize
    super
    @client = T.let(Notion::Client.new, Notion::Client)
  end

  # == Pages
  sig do
    params(database_id: String, options: T.untyped).returns(T.untyped)
  end
  def list_pages(database_id, **options)
    results = T.let([], T::Array[T.untyped])
    @client.database_query(database_id:, **options) do |page|
      results.concat(page.results)
    end
    results
  end

  sig { params(database_id: String, options: T.untyped).returns(T.untyped) }
  def self.list_pages(database_id, **options)
    instance.list_pages(database_id, **options)
  end

  sig { params(id: String).returns(T.untyped) }
  def retrieve_page(id)
    @client.page(page_id: id)
  end

  sig { params(id: String).returns(T.untyped) }
  def self.retrieve_page(id)
    instance.retrieve_page(id)
  end

  sig { params(id: String).returns(T::Array[T.untyped]) }
  def retrieve_page_content(id)
    recursively_retrieve_blocks(id)
  end

  sig { params(id: String).returns(T::Array[T.untyped]) }
  def self.retrieve_page_content(id)
    instance.retrieve_page_content(id)
  end

  sig { params(database_id: String, name: String).returns(T.untyped) }
  def create_page(database_id, name:)
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

  sig { params(database_id: String, name: String).returns(T.untyped) }
  def self.create_page(database_id, name:)
    instance.create_page(database_id, name:)
  end

  # == Comments
  sig do
    params(page_id: String, options: T.untyped).returns(T.untyped)
  end
  def list_comments(page_id, **options)
    results = T.let([], T::Array[T.untyped])
    @client.retrieve_comments(block_id: page_id, **options) do |page|
      results.concat(page.results)
    end
    results
  end

  sig { params(page_id: String, options: T.untyped).returns(T.untyped) }
  def self.list_comments(page_id, **options)
    instance.list_comments(page_id, **options)
  end

  sig { params(page_id: String, text: String).returns(T.untyped) }
  def create_comment(page_id, text:)
    @client.create_comment(
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

  sig { params(page_id: String, text: String).returns(T.untyped) }
  def self.create_comment(page_id, text:)
    instance.create_comment(page_id, text:)
  end

  private

  sig { params(parent_block_id: String).returns(T::Array[T.untyped]) }
  def recursively_retrieve_blocks(parent_block_id)
    message = @client.block_children(block_id: parent_block_id)
    blocks = T.let(message.results, T::Array[T.untyped])
    blocks.each do |block|
      if block["has_children"]
        block["children"] = recursively_retrieve_blocks(block.id)
      end
    end
    blocks
  end
end
