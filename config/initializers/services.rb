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
      TelnyxService.start
      if Rails.server?
        CurrentlyPlayingService.start
        ScottbotService.start
        ScottcallService.start
      end
    end
    reloader.before_class_unload do
      if Rails.server?
        ScottcallService.stop
        ScottbotService.stop
        CurrentlyPlayingService.stop
      end
      TelnyxService.stop
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
