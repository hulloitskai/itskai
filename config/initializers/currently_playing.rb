# typed: true
# frozen_string_literal: true

# Poll for currently playing updates.
Rails.application.configure do
  if Rails.server?
    reloader.to_prepare do
      puts "=> Polling currently playing" # rubocop:disable Rails/Output
      CurrentlyPlaying.start_poll
    end

    reloader.before_class_unload do
      puts "=> Stopping currently playing poll" # rubocop:disable Rails/Output
      CurrentlyPlaying.stop_poll
    end
  end
end
