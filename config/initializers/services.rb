# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server? || Rails.console?
    reloader.to_prepare do
      ActivityService.start
      ICloudService.start
      InstagramService.start
      SpotifyService.start
      JournalEntriesService.start
      ActionItemsService.start
      ResumeService.start
      LocationService.start
      TelnyxService.start
      AnnouncementsService.start
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
      AnnouncementsService.stop
      TelnyxService.stop
      LocationService.stop
      ActionItemsService.stop
      JournalEntriesService.stop
      ResumeService.stop
      SpotifyService.stop
      InstagramService.stop
      ICloudService.stop
      ActivityService.stop
    end
  end

  if Rails.test?
    reloader.to_prepare do
      ActivityService.start
      AnnouncementsService.start
    end
    reloader.before_class_unload do
      AnnouncementsService.stop
      ActivityService.stop
    end
  end
end
