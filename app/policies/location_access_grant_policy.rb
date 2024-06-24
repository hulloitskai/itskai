# typed: true
# frozen_string_literal: true

class LocationAccessGrantPolicy < ApplicationPolicy
  # == Rules
  def show? = false

  # == Scopes
  relation_scope do |relation|
    user&.owner? ? relation : relation.none
  end
end
