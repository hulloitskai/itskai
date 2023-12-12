# typed: true
# frozen_string_literal: true

module Journey
  class SessionPolicy < ApplicationPolicy
    # == Rules
    def index? = false
  end
end
