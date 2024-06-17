# typed: true
# frozen_string_literal: true

module RSpotify
  class TrackSerializer < ApplicationSerializer
    # == Attributes
    attributes id: { identifier: true, type: :string },
               name: { type: :string },
               duration_ms: { type: :number }
    attribute :spotify_url, type: :string do
      track.external_urls.fetch("spotify")
    end

    # == Associations
    has_one :album, serializer: AlbumSerializer
    has_many :artists, serializer: ArtistSerializer
  end
end
