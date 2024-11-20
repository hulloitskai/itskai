# typed: true
# frozen_string_literal: true

class NotificationPolicy < ApplicationPolicy
  # == Rules
  def show? = false
end
