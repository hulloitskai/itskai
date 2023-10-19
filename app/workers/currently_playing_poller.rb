# typed: strict
# frozen_string_literal: true

class CurrentlyPlayingPoller < ApplicationWorker
  # == Initializer
  sig { void }
  def initialize
    super
    @task = T.let(@task, T.nilable(Concurrent::TimerTask))
  end

  # == Lifecycle
  sig { override.void }
  def start
    stop
    @task = Concurrent::TimerTask.new(execution_interval: 3) do
      Rails.application.reloader.wrap { CurrentlyPlayingPoll.run }
    end
    ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
      @task.execute
    end
  end

  sig { override.void }
  def stop
    if @task
      ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
        @task.kill if @task.running?
      end
      @task = nil
    end
  end
end
