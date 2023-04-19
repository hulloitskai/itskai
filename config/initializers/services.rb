# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  return unless Rails.server? || Rails.console?

  reloader.to_prepare do
    ActivityService.start
    ICloudService.start
    ObsidianService.start
    SpotifyService.start
    CurrentlyPlayingService.start if Rails.server?
    JournalService.start
    ResumeService.start
  end

  reloader.before_class_unload do
    CurrentlyPlayingService.stop if Rails.server?
  end
end
