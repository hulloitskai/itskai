# typed: strict
# frozen_string_literal: true

module Queries
  class JourneysSessionParticipation < JourneysBaseQuery
    include AllowsFailedLoads

    # == Definition
    type Types::JourneysSessionParticipationType, null: true

    # == Arguments
    argument :id,
             ID,
             loads: Types::JourneysSessionParticipationType,
             as: :participation

    # == Resolver
    sig do
      params(participation: T.nilable(::Journeys::SessionParticipation))
        .returns(T.nilable(::Journeys::SessionParticipation))
    end
    def resolve(participation:)
      return unless participation
      participation if allowed_to?(:show?, participation)
    end
  end
end
