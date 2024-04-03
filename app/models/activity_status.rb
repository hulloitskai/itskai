# typed: strict
# frozen_string_literal: true

class ActivityStatus
  extend T::Sig
  include Singleton

  # == Constants
  CACHE_KEY = T.let(%i[activity_status], T.anything)
  DURATION = T.let(3.seconds, ActiveSupport::Duration)

  # == Initializer
  sig { void }
  def initialize
    @clear_task = T.let(@clear_task, T.nilable(Concurrent::TimerTask))
  end

  # == Attributes
  sig { returns(T.nilable(Concurrent::TimerTask)) }
  attr_accessor :clear_task

  # == Current
  sig { returns(T.nilable(String)) }
  def self.current
    Rails.cache.read(CACHE_KEY)
  end

  sig { params(status: String).void }
  def self.current=(status)
    Rails.cache.write(CACHE_KEY, status, expires_in: DURATION)
    clear_later
    trigger_subscriptions(status)
  end

  sig { void }
  def self.clear
    trigger_subscriptions(nil) if current.nil?
  end

  sig { void }
  def self.clear_later
    instance.clear_task&.kill
    clear_task = instance.clear_task = Concurrent::TimerTask.new(
      execution_interval: DURATION,
    ) do
      Rails.application.reloader.wrap do
        clear
      end
    end
    ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
      clear_task.execute
    end
  end

  private

  # == Helpers
  sig { params(status: T.nilable(String)).void }
  private_class_method def self.trigger_subscriptions(status)
    Schema.subscriptions!.trigger(:activity_status, {}, status)
  end
end
