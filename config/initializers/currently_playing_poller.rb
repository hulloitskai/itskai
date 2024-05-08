# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    if CurrentlyPlayingPoller.enabled?
      puts "=> Starting CurrentlyPlayingPoller" # rubocop:disable Rails/Output
      CurrentlyPlayingPoller.start
    end
  end if Rails.server?
end
