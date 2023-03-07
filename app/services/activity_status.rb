# typed: true
# frozen_string_literal: true

class ActivityStatus < ApplicationService
  class << self
    sig { params(status: String).void }
    def update(status) = instance.update(status)

    sig { returns(T.nilable(String)) }
    def current = instance.current
  end

  sig { void }
  def initialize
    super
    @latest = T.let(Concurrent::Atom.new(nil), Concurrent::Atom)
    @clear_task = T.let(build_clear_task, Concurrent::ScheduledTask)
  end

  # == Methods
  sig { params(status: String).void }
  def update(status)
    latest.reset(status)
    Schema.subscriptions!.trigger(:activity_status, {}, status)
    schedule_clear_task
  end

  sig { returns(T.nilable(String)) }
  def current = latest.value

  private

  sig { returns(Concurrent::Atom) }
  attr_reader :latest

  sig { returns(Concurrent::ScheduledTask) }
  attr_accessor :clear_task

  # TODO: Can this assignment be a race condition?
  sig { void }
  def schedule_clear_task
    if clear_task.unscheduled?
      clear_task.execute
    elsif clear_task.pending?
      clear_task.reset
    else
      self.clear_task = build_clear_task.tap(&:execute)
    end
  end

  sig { returns(Concurrent::ScheduledTask) }
  def build_clear_task
    Concurrent::ScheduledTask.new(3) do
      latest.reset(nil)
      Schema.subscriptions!.trigger(:activity_status, {}, nil)
    end
  end
end

class ActivityStatus
end
