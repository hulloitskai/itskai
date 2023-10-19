# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  if Rails.server?
    config.after_initialize do
      puts "=> Starting pensieve receiver" # rubocop:disable Rails/Output
      PensieveReceiver.start
    end
  end
end
