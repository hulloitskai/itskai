# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    if PensieveReceiver.enabled?
      puts "=> Starting pensieve receiver" # rubocop:disable Rails/Output
      PensieveReceiver.start
    end
  end if Rails.server?
end
