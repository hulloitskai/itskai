# typed: true
# frozen_string_literal: true

class EventPolicy < ApplicationPolicy
  # == Rules
  def index? = false
end
