# typed: true
# frozen_string_literal: true

# Poll for currently playing updates.
Rails.application.configure do
  if Rails.server?
    reloader.to_prepare do
      puts "=> Polling currently playing" # rubocop:disable Rails/Output
      CurrentlyPlaying.poll
    end

    reloader.before_class_unload do
      CurrentlyPlaying.unpoll
    end
  end
end
