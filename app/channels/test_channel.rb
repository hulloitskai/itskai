# typed: true
# frozen_string_literal: true

class TestChannel < ApplicationCable::Channel
  include Concurrent

  # == Initializer
  def initialize(...)
    super
    @task = T.let(@task, T.nilable(TimerTask))
  end

  # == Handlers
  def subscribed
    @task = TimerTask.execute(execution_interval: 1) do |task|
      task = T.let(task, TimerTask)
      value = (task.value || 0) + 1
      broadcast_to(identity, { value: })
      value
    end
    stream_for(identity)
  end

  def unsubscribed
    @task&.shutdown
  end

  private

  # == Helpers
  sig { params(value: Integer).void }
  def broadcast(value)
  end
end
