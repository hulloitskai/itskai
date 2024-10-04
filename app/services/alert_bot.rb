# typed: strict
# frozen_string_literal: true

class AlertBot < ApplicationService
  include Singleton

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Alerts.bot_client, Telegram::Bot::Client)
  end

  # == Attributes
  sig { returns(Telegram::Bot::Client) }
  attr_reader :client

  # == Methods
  sig do
    params(message: String).returns(Telegram::Bot::Types::Message)
  end
  def self.alert(message)
    instance.client.api.send_message(
      text: message,
      chat_id: Alerts.telegram_user_id,
    )
  end
end
