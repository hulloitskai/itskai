# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    puts "=> Starting QueryWatcher" # rubocop:disable Rails/Output
    QueryWatcher.start
  end if Rails.server? && Rails.env.development?
end
