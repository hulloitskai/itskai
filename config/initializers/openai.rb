# typed: strict
# frozen_string_literal: true

OpenAI.configure do |config|
  config.access_token = ENV["OPENAI_ACCESS_TOKEN"].presence
  config.organization_id = ENV["OPENAI_ORGANIZATION_ID"].presence
end
