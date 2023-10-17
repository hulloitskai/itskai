# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server? && Rails.env.development?
    reloader.to_prepare do
      puts "=> Watching queries for changes" # rubocop:disable Rails/Output
      QueryManager.watch
    end

    reloader.before_class_unload do
      QueryManager.unwatch
    end
  end
end
