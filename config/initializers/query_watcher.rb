# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server? && Rails.env.development?
    config.after_initialize do
      puts "=> Starting query watcher" # rubocop:disable Rails/Output
      QueryWatcher.start
    end
  end
end
