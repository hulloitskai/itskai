# typed: true
# frozen_string_literal: true

module Types
  class SpotifyTrackType < BaseObject
    # == Fields
    field :album, SpotifyAlbumType, null: false
    field :artists, [SpotifyArtistType], null: false
    field :duration_milliseconds, Integer, null: false, method: :duration_ms
    field :id, String, null: false
    field :is_explicit, Boolean, null: false, method: :explicit
    field :lyrics, [SpotifyLyricLineType]
    field :name, String, null: false
    field :url, String, null: false

    # == Resolvers
    sig { returns(T.nilable(T::Array[SpotifyService::LyricLine])) }
    def lyrics
      SpotifyService.retrieve_lyrics(track_id: object.id)
    end

    sig { returns(String) }
    def url
      object.external_urls.fetch("spotify")
    end
  end
end

# == Sorbet
module Types
  class SpotifyTrackType
    # == Annotations
    sig { returns(RSpotify::Track) }
    def object = super
  end
end
