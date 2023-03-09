# typed: true
# frozen_string_literal: true

module Types
  class SpotifyArtistType < BaseObject
    # == Fields
    field :id, String, null: false
    field :name, String, null: false
    field :url, String, null: false

    # == Resolvers
    sig { returns(String) }
    def url
      object.external_urls.fetch("spotify")
    end
  end
end

# == Sorbet
module Types
  class SpotifyArtistType
    # == Annotations
    sig { returns(RSpotify::Artist) }
    def object = super
  end
end
