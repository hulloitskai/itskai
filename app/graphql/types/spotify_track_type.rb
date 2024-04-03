# typed: strict
# frozen_string_literal: true

module Types
  class SpotifyTrackType < BaseObject
    # == Fields
    field :album, SpotifyAlbumType, null: false
    field :artists, [SpotifyArtistType], null: false
    field :duration_milliseconds, Integer, null: false, method: :duration_ms
    field :id, String, null: false
    field :lyrics, [LyricLineType]
    field :name, String, null: false
    field :url, String, null: false

    # == Helpers
    sig { override.returns(SpotifyTrack) }
    def object = super
  end
end
