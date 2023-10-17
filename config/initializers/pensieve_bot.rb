# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server?
    reloader.to_prepare do
      puts "=> Starting pensieve bot" # rubocop:disable Rails/Output
      PensieveBot.start
    end

    reloader.before_class_unload do
      PensieveBot.stop
    end
  end
end
