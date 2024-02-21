# typed: strict
# frozen_string_literal: true

module Queries
  class JourneysSessions < JourneysBaseQuery
    include AllowsFailedLoads

    # == Definition
    type Types::JourneysSessionType.connection_type, null: false

    # == Resolver
    sig { returns(T::Enumerable[::Journeys::Session]) }
    def resolve
      sessions = authorized_scope(Journeys::Session.all)
      sessions.reverse_chronological
    end
  end
end
