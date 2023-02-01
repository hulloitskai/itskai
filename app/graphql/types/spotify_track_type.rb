# typed: true
# frozen_string_literal: true

module Types
  class SpotifyTrackType < BaseObject
    # == Fields
    field :album, SpotifyAlbumType, null: false
    field :artists, [SpotifyArtistType], null: false
    field :id, String, null: false
    field :name, String, null: false
    field :url, String, null: false

    # == Methods
    sig { returns(RSpotify::Track) }
    def object
      super
    end

    # == Resolvers
    sig { returns(String) }
    def url
      object.external_urls.fetch("spotify")
    end
  end
end
