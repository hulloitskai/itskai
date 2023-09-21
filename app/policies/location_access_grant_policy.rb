# typed: true
# frozen_string_literal: true

class LocationAccessGrantPolicy < ApplicationPolicy
  # == Rules
  def index? = false
  def show? = false

  # == Scopes
  relation_scope do |relation|
    active_user&.owner? ? relation : relation.none
  end
end
