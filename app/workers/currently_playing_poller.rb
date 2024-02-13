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

  # == Methods
  sig { override.returns(T::Boolean) }
  def self.enabled?
    super && CurrentlyPlayingPoll.ready?
  end

  # == Lifecycle
  sig { override.void }
  def self.start
    stop
    task = instance.task = Concurrent::TimerTask.new(execution_interval: 3) do
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
end
