# typed: strict
# frozen_string_literal: true

module Queries
  class CurrentlyPlaying < BaseQuery
    extend T::Sig
    extend T::Helpers

    description "What I'm currently listening to on Spotify!"
    type Types::SpotifyTrackType, null: true

    sig { returns(T.nilable(RSpotify::Track)) }
    def resolve
      ::CurrentlyPlaying.current_track if ::CurrentlyPlaying.ready?
    end
  end
end
