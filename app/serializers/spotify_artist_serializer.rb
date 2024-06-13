# typed: true
# frozen_string_literal: true

class SpotifyArtistSerializer < ApplicationSerializer
  object_as :artist, model: "RSpotify::Artist"

  # == Attributes
  identifier type: :string
  attributes name: { type: :string }
  attribute :spotify_url, type: :string do
    artist.external_urls.fetch("spotify")
  end
end
