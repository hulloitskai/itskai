# typed: true
# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  # == Rules
  def edit?
    record = T.cast(self.record, User)
    authenticate! == record
  end
end
