# typed: strict
# frozen_string_literal: true

class PensieveReceiver < ApplicationWorker
  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Pensieve.bot_client, T.nilable(Telegram::Bot::Client))
    @thread = T.let(nil, T.nilable(Thread))
  end

  sig { returns(T.nilable(Telegram::Bot::Client)) }
  attr_reader :client

  sig { returns(T.nilable(Thread)) }
  attr_accessor :thread

  # == Lifecycle
  sig { override.returns(T::Boolean) }
  def self.enabled?
    super && instance.client.present?
  end

  sig { override.void }
  def self.start
    client = instance.client or raise "Telegram client not initialized"
    instance.thread ||= Thread.new do
      client.run do |bot|
        bot.listen do |message|
          Rails.application.reloader.wrap do
            with_log_tags do
              logger.info("Received message: #{message.text}")
            end
            PensieveBot.receive_message(message, bot)
          end
        end
      end
    end
  end

  sig { override.void }
  def self.stop
    if (thread = instance.thread)
      ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
        thread.kill if thread.status.in?(%w[run sleep])
      end
      instance.thread = nil
    end
  end
end
