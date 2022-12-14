# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    server = Rails.const_defined?(:Server)
    console = Rails.const_defined?(:Console)
    if server || console
      ICloud.start
      Obsidian.start
      Spotify.start
      CurrentlyPlaying.start if server
    end
  end
end
