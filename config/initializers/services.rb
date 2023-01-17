# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  return unless Rails.server? || Rails.console?

  reloader.to_prepare do
    ICloud.start
    Obsidian.start
    Spotify.start
    CurrentlyPlaying.start if Rails.server?
    Linear.start
    Notifi.start
    QrCodeGenerator.start
  end

  reloader.before_class_unload do
    CurrentlyPlaying.stop if Rails.server?
  end
end
