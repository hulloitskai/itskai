# typed: strict
# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  sig { returns(T::Boolean) }
  def edit?
    authenticate! == record
  end
end
