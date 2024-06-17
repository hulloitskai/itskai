# typed: true
# frozen_string_literal: true

module RSpotify
  class ArtistSerializer < ApplicationSerializer
    # == Attributes
    identifier type: :string
    attributes name: { type: :string }
    attribute :spotify_url, type: :string do
      artist.external_urls.fetch("spotify")
    end
  end
end
