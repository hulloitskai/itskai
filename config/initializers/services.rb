# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server? || Rails.console?
    reloader.to_prepare do
      NotionService.start
      ICloudService.start
      InstagramService.start
    end
    reloader.before_class_unload do
      InstagramService.stop
      ICloudService.stop
      NotionService.stop
    end
  end
end
