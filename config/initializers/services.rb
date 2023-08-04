# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server? || Rails.console?
    reloader.to_prepare do
      NotionService.start
      ICloudService.start
      InstagramService.start
      SpotifyService.start
      TelnyxService.start
    end
    reloader.before_class_unload do
      TelnyxService.stop
      SpotifyService.stop
      InstagramService.stop
      ICloudService.stop
      NotionService.stop
    end
  end
end
