# typed: true
# frozen_string_literal: true

class ActivityService < ApplicationService
  class << self
    sig { params(status: String).void }
    def update_status(status) = instance.update_status(status)

    sig { returns(T.nilable(String)) }
    def status = instance.status
  end

  sig { void }
  def initialize
    super
    @status_atom = T.let(Concurrent::Atom.new(nil), Concurrent::Atom)
    @clear_status_task = T.let(build_clear_status_task,
                               Concurrent::ScheduledTask)
  end

  # == Methods
  sig { params(status: String).void }
  def update_status(status)
    status_atom.reset(status)
    Schema.subscriptions!.trigger(:activity_status, {}, status)
    schedule_clear_status_task
  end

  sig { returns(T.nilable(String)) }
  def status = status_atom.value

  private

  # == Attributes
  sig { returns(Concurrent::Atom) }
  attr_reader :status_atom

  sig { returns(Concurrent::ScheduledTask) }
  attr_accessor :clear_status_task

  # == Helpers
  # TODO: Can this assignment be a race condition?
  sig { void }
  def schedule_clear_status_task
    if clear_status_task.unscheduled?
      clear_status_task.execute
    elsif clear_status_task.pending?
      clear_status_task.reset
    else
      self.clear_status_task = build_clear_status_task.tap(&:execute)
    end
  end

  sig { returns(Concurrent::ScheduledTask) }
  def build_clear_status_task
    Concurrent::ScheduledTask.new(3) do
      if status_atom.value
        status_atom.reset(nil)
        Schema.subscriptions!.trigger(:activity_status, {}, nil)
      end
    end
  end
end
