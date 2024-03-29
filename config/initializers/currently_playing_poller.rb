# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server?
    config.after_initialize do
      if CurrentlyPlayingPoller.enabled?
        puts "=> Starting currently playing poller" # rubocop:disable Rails/Output
        CurrentlyPlayingPoller.start
      end
    end
  end
end
