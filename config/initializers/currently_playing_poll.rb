# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server?
    reloader.to_prepare do
      puts "=> Starting currently playing poll" # rubocop:disable Rails/Output
      CurrentlyPlayingPoll.start
    end

    reloader.before_class_unload do
      CurrentlyPlayingPoll.stop
    end
  end
end
