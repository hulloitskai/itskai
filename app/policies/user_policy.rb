# typed: strict
# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  sig { override.returns(T::Boolean) }
  def index?
    false
  end

  sig { override.returns(T::Boolean) }
  def show?
    true
  end

  sig { returns(T::Boolean) }
  def edit?
    authenticate! == record
  end
end
