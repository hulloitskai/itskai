# typed: strict
# frozen_string_literal: true

module Mutations
  class ActivateSpotifyJamSession < BaseMutation
    # == Fields
    field :session, Types::SpotifyJamSessionType, null: false

    # == Resolver
    sig { returns({ session: SpotifyJamSession }) }
    def resolve
      authorize!(to: :activate?, with: SpotifyJamSessionPolicy)
      session = SpotifyJamSession.current_or_activate
      { session: }
    end
  end
end
