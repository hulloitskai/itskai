# typed: strict
# frozen_string_literal: true

class CurrentlyPlayingPoller < ApplicationWorker
  # == Initializer
  sig { void }
  def initialize
    super
    @task = T.let(@task, T.nilable(Concurrent::TimerTask))
  end

  # == Attributes
  sig { returns(T.nilable(Concurrent::TimerTask)) }
  attr_accessor :task

  # == Lifecycle
  sig { override.void }
  def self.start
    stop
    task = instance.task = Concurrent::TimerTask.new(execution_interval:) do
      Rails.application.reloader.wrap do
        CurrentlyPlayingPoll.run
      end
    end
    ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
      task.execute
    end
  end

  sig { override.void }
  def self.stop
    if (task = instance.task)
      ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
        task.kill if task.running?
      end
      instance.task = nil
    end
  end

  private

  # == Helpers
  sig { returns(Integer) }
  private_class_method def self.execution_interval
    SpotifyUser.current? ? 3 : 30
  end
end
