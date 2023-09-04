# typed: strict
# frozen_string_literal: true

class ActionItem < ApplicationModel
  # == Attributes
  attribute :name, :string
  validates :name, presence: true, length: { maximum: 64 }

  sig { returns(String) }
  def name!
    name or "Missing name"
  end

  # == Notion
  sig { returns(String) }
  def self.notion_database_id
    ENV["ACTION_ITEM_NOTION_DATABASE_ID"] or
      raise "Missing action items Notion database ID"
  end

  sig { returns(String) }
  def notion_database_id = self.class.notion_database_id

  sig { returns(T.untyped) }
  def create_notion_page
    validate!
    NotionClient.create_page(notion_database_id, name: name!)
  end
end
