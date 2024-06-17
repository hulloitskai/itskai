# typed: true
# frozen_string_literal: true

module RSpotify
  class AlbumSerializer < ApplicationSerializer
    # == Attributes
    identifier type: :string
    attributes name: { type: :string }
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
