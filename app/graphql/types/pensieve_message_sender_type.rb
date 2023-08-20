# typed: true
# frozen_string_literal: true

module Types
  class PensieveMessageSenderType < BaseEnum
    # == Values
    value "USER", value: :user
    value "BOT", value: :bot
  end
end
