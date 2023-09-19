# typed: true
# frozen_string_literal: true

class AdminPolicy < ApplicationPolicy
  # == Rules
  def show? = false
end
