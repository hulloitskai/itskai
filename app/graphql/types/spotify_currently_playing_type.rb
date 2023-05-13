# typed: true
# frozen_string_literal: true

module Types
  class SpotifyCurrentlyPlayingType < BaseObject
    # == Fields
    field :progress_milliseconds, Integer, null: false
    field :track, SpotifyTrackType, null: false

    # == Helpers
    sig { override.returns(SpotifyService::CurrentlyPlaying) }
    def object = super
  end
end
