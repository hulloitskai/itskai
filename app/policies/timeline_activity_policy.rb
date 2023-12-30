# typed: true
# frozen_string_literal: true

class TimelineActivityPolicy < ApplicationPolicy
  # == Rules
  def index? = false
end
