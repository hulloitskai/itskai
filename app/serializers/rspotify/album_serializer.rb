# typed: true
# frozen_string_literal: true

module RSpotify
  class AlbumSerializer < ApplicationSerializer
    # == Attributes
    attributes id: { identifier: true, type: :string }, name: { type: :string }
    attribute :image_url, type: :string, nullable: true do
      if (image = album.images.second_to_last)
        image.fetch("url")
      end
    end
    attribute :spotify_url, type: :string do
      album.external_urls.fetch("spotify")
    end
  end
end
