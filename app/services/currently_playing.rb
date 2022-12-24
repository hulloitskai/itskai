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
  def ready?
    Spotify.ready?
  end

  sig { void }
  def start
    return if task.running?
    task.execute
  end

  sig { void }
  def stop
    return unless task.running?
    task.delete_observers
    task.kill
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
    sig { override.returns(T.attached_class) }
    def start = super.tap(&:start)

    sig { void }
    def stop = instance.stop

    # == Methods
    sig { returns(T.nilable(RSpotify::Track)) }
    def current_track = instance.current_track
  end
end
