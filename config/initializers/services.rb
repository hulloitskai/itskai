# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  server = Rails.const_defined?(:Server)
  console = Rails.const_defined?(:Console)
  return unless server || console

  reloader.to_prepare do
    ICloud.start
    Obsidian.start
    Spotify.start
    CurrentlyPlaying.start if server
  end

  reloader.before_class_unload do
    CurrentlyPlaying.stop if server
  end
end
