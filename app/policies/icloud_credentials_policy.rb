# typed: strict
# frozen_string_literal: true

class ICloudCredentialsPolicy < ApplicationPolicy
  sig { override.returns(T::Boolean) }
  def show?
    false
  end

  sig { returns(T::Boolean) }
  def edit?
    false
  end
end
