# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  return unless Rails.server? || Rails.console?

  reloader.to_prepare do
    ActivityService.start
    ICloudService.start
    ObsidianService.start
    SpotifyService.start
    JournalService.start
    ResumeService.start
    if Rails.server?
      CurrentlyPlayingService.start
      ScottbotService.start
    end
  end

  if Rails.server?
    reloader.before_class_unload do
      CurrentlyPlayingService.stop
      ScottbotService.stop
    end
  end
end
