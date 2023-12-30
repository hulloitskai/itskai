# typed: true
# frozen_string_literal: true

module Journeys
  class SessionPolicy < ApplicationPolicy
    # == Scopes
    relation_scope do |relation|
      relation
    end
  end
end
