# typed: true
# frozen_string_literal: true

# Poll for currently playing updates.
Rails.application.configure do
  if Rails.server?
    config.after_initialize do
      puts "=> Polling for currently playing" # rubocop:disable Rails/Output
      CurrentlyPlaying.start_poll
    end
  end
end
