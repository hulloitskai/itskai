# typed: strict
# frozen_string_literal: true

module Queries
  class JourneysSession < JourneysBaseQuery
    include AllowsFailedLoads

    # == Type
    type Types::JourneysSessionType, null: true

    # == Arguments
    argument :id, ID, loads: Types::JourneysSessionType, as: :session

    # == Resolver
    sig do
      params(session: T.nilable(::Journeys::Session))
        .returns(T.nilable(::Journeys::Session))
    end
    def resolve(session:)
      return unless session
      session if allowed_to?(:show?, session)
    end
  end
end
