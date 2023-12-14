# typed: true
# frozen_string_literal: true

module Journeys
  class SessionPolicy < ApplicationPolicy
    # == Rules
    def index? = false
  end
end
