# typed: true
# frozen_string_literal: true

class CurrentlyPlayingService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def enabled? = T.let(super, T::Boolean) && SpotifyService.enabled?

    sig { void }
    def stop = instance.stop

    sig { returns(T::Boolean) }
    def debug?
      checked { instance.debug? }
    end

    # == Methods
    sig { returns(T.nilable(RSpotify::Track)) }
    def current_track
      instance.current_track if ready?
    end
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @task = T.let(
      Concurrent::TimerTask.new(execution_interval: 2) do |task|
        Rails.application.reloader.wrap do
          previous_result = T.let(task.value, T.nilable(RSpotify::Track))
          poll = Poller.new(previous_result:)
          poll.call
        end
      end,
      Concurrent::TimerTask,
    )
    @task.add_observer(SubscriptionsTrigger.new)
  end

  # == Service
  sig { override.returns(T::Boolean) }
  def ready?
    T.must(super && SpotifyService.ready?)
  end

  sig { override.void }
  def start
    super
    task.execute unless task.running?
  end

  sig { void }
  def stop
    task.kill if started?
  end

  sig { returns(T::Boolean) }
  def debug?
    return !!@debug if defined?(@debug)
    @debug = T.let(@debug, T.nilable(T::Boolean))
    @debug = ENV["CURRENTLY_PLAYING_DEBUG"].truthy?
  end

  # == Methods
  sig { returns(T.nilable(RSpotify::Track)) }
  def current_track = task.value

  private

  # == Attributes
  sig { returns(Concurrent::TimerTask) }
  attr_reader :task
end

class CurrentlyPlayingService
end
