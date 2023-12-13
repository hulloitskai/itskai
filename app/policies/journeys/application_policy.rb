# typed: true
# frozen_string_literal: true

module Journeys
  class ApplicationPolicy < ::ApplicationPolicy
    # == Context
    authorize :participant_id
  end
end
