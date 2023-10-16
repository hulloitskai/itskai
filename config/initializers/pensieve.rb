# typed: strict
# frozen_string_literal: true

# Run pensieve to collect Kai's thoughts.
Rails.application.configure do
  if Rails.server?
    config.after_initialize do
      puts "=> Starting Pensieve bot" # rubocop:disable Rails/Output
      Pensieve.start_bot
    end
  end
end
