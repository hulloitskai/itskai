# typed: strict
# frozen_string_literal: true

require "pensieve"

class PensieveReceiver < ApplicationWorker
  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Pensieve.bot_client, T.nilable(Telegram::Bot::Client))
    @thread = T.let(nil, T.nilable(Thread))
  end

  # == Methods
  sig { returns(T::Boolean) }
  def enabled?
    @client.present?
  end

  sig { returns(T::Boolean) }
  def self.enabled? = instance.enabled?

  # == Lifecycle
  sig { override.void }
  def start
    raise "Telegram client not initialized" unless @client
    @thread ||= Thread.new do
      @client.run do |bot|
        bot.listen do |message|
          Rails.application.reloader.wrap do
            tag_logger do
              logger.info("Received message: #{message.text}")
            end
            PensieveBot.receive_message(message, bot)
          end
        end
      end
    end
  end

  sig { override.void }
  def stop
    if @thread
      ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
        @thread.kill if @thread.status
      end
      @thread = nil
    end
  end
end
