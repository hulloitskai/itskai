# typed: strict
# frozen_string_literal: true

Notion.configure do |config|
  config.token = ENV["NOTION_API_TOKEN"]
end
