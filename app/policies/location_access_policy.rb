# typed: true
# frozen_string_literal: true

class LocationAccessPolicy < ApplicationPolicy
  # == Rules
  def show? = false

  # == Scopes
  relation_scope do |relation|
    active_user&.owner? ? relation : relation.none
  end
end
