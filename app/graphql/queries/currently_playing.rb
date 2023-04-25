# typed: true
# frozen_string_literal: true

module Queries
  class CurrentlyPlaying < BaseQuery
    # == Configuration
    description "What I'm currently listening to on Spotify!"

    # == Type
    type Types::SpotifyCurrentlyPlayingType, null: true

    # == Resolver
    sig { returns(T.nilable(SpotifyService::CurrentlyPlaying)) }
    def resolve
      CurrentlyPlayingService.currently_playing
    end
  end
end
