# typed: true
# frozen_string_literal: true

# Run pensieve to collect Kai's thoughts.
Rails.application.configure do
  if Rails.server?
    reloader.to_prepare do
      puts "=> Running pensieve" # rubocop:disable Rails/Output
      Pensieve.run
    end

    reloader.before_class_unload do
      puts "=> Stopping pensieve" # rubocop:disable Rails/Output
      Pensieve.stop
    end
  end
end
