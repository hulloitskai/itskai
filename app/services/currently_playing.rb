# typed: strict
# frozen_string_literal: true

class CurrentlyPlaying < ApplicationService
  extend T::Sig

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
  def ready? = T.let(super, T::Boolean) && Spotify.ready?

  sig { override.void }
  def start
    super
    task.execute unless task.running?
  end

  sig { void }
  def stop
    task.kill
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

  # == Helpers
  sig { returns(Concurrent::TimerTask) }
  attr_reader :task
end

class CurrentlyPlaying
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def enabled? = T.let(super, T::Boolean) && Spotify.enabled?

    sig { void }
    def stop = instance.stop

    sig { returns(T::Boolean) }
    def debug? = instance.debug?

    # == Methods
    sig { returns(T.nilable(RSpotify::Track)) }
    def current_track = instance.current_track
  end
end
