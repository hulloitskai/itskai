# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server? || Rails.console?
    reloader.to_prepare do
      ActivityService.start
      ICloudService.start
      SpotifyService.start
      JournalService.start
      ActionItemsService.start
      ResumeService.start
      LocationService.start
      if Rails.server?
        CurrentlyPlayingService.start
        ScottbotService.start
      end
    end
    reloader.before_class_unload do
      if Rails.server?
        ScottbotService.stop
        CurrentlyPlayingService.stop
      end
      LocationService.stop
      ActionItemsService.stop
      ResumeService.stop
      JournalService.stop
      SpotifyService.stop
      ICloudService.stop
      ActivityService.stop
    end
  end

  if Rails.test?
    reloader.to_prepare do
      ActivityService.start
    end
    reloader.before_class_unload do
      ActivityService.stop
    end
  end
end
