# typed: strict
# frozen_string_literal: true

module Queries
  class JourneysSessions < JourneysBaseQuery
    include AllowsFailedLoads

    # == Type
    type Types::JourneysSessionType.connection_type, null: false

    # == Resolver
    sig { returns(T::Enumerable[::Journeys::Session]) }
    def resolve
      sessions = T.cast(
        authorized_scope(Journeys::Session.all),
        Journeys::Session::PrivateRelation,
      )
      sessions.reverse_chronological
    end
  end
end
