# typed: true
# frozen_string_literal: true

# Run pensieve to collect Kai's thoughts.
Rails.application.configure do
  if Rails.server?
    reloader.to_prepare do
      puts "=> Starting Pensieve bot" # rubocop:disable Rails/Output
      Pensieve.start_bot
    end

    reloader.before_class_unload do
      puts "=> Stopping Pensieve bot" # rubocop:disable Rails/Output
      Pensieve.stop_bot
    end
  end
end
