# typed: true
# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  # == Rules
  def edit?
    user = T.cast(record, User)
    authenticate! == user
  end
end
