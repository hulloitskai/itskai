# typed: true
# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  # == Rules
  def index? = false

  def manage?
    user = T.cast(record, User)
    authenticate! == user
  end
end
