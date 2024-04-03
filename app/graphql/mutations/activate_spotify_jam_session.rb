# typed: strict
# frozen_string_literal: true

module Mutations
  class ActivateSpotifyJamSession < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :session, SpotifyJamSession
    end

    # == Fields
    field :session, Types::SpotifyJamSessionType, null: false

    # == Resolver
    sig { returns(Payload) }
    def resolve
      authorize!(to: :activate?, with: SpotifyJamSessionPolicy)
      session = SpotifyJamSession.current_or_activate
      Payload.new(session:)
    end
  end
end
