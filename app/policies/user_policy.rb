# typed: true
# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  # == Rules
  def manage?
    user! == record
  end
end
