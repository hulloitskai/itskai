# typed: true
# frozen_string_literal: true

class SpotifyTrackSerializer < ApplicationSerializer
  object_as :track, model: "RSpotify::Track"

  # == Attributes
  identifier type: :string
  attributes name: { type: :string }, duration_ms: { type: :number }
  attribute :spotify_url, type: :string do
    track.external_urls.fetch("spotify")
  end

  # == Associations
  has_one :album, serializer: SpotifyAlbumSerializer
  has_many :artists, serializer: SpotifyArtistSerializer
end
