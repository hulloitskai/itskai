# typed: true
# frozen_string_literal: true

module Journeys
  class SessionParticipationPolicy < ApplicationPolicy
    # == Rules
    def index? = false

    def update?
      participation = T.let(record, SessionParticipation)
      participation.participant_id == participant_id
    end
  end
end
