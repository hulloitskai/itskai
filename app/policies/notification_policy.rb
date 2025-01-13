# typed: true
# frozen_string_literal: true

class NotificationPolicy < ApplicationPolicy
  # == Rules
  def show? = false

  # == Scopes
  relation_scope do |relation|
    if (user = self.user)
      if user.owner?
        relation
      else
        relation.none
      end
    elsif (friend = self.friend)
      relation.where(friend:)
    else
      relation.none
    end
  end
end
