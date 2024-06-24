# typed: strict
# frozen_string_literal: true

return if ENV["PENSIEVE_RECEIVER_DISABLED"].truthy?

Rails.application.configure do
  config.after_initialize do
    if PensieveReceiver.enabled?
      puts "=> Starting PensieveReceiver" # rubocop:disable Rails/Output
      PensieveReceiver.start
    end
  end if Rails.server?
end
