# typed: true
# frozen_string_literal: true

module Types
  class SpotifyAlbumType < BaseObject
    # == Fields
    field :id, String, null: false
    field :image_url, String
    field :name, String, null: false
    field :url, String, null: false

    # == Resolvers
    sig { returns(T.nilable(String)) }
    def image_url
      object.images.second_to_last.try! do |image|
        T.let(image, T::Hash[String, T.untyped])
        image.fetch("url")
      end
    end

    sig { returns(String) }
    def url
      object.external_urls.fetch("spotify")
    end
  end
end

# == Sorbet
module Types
  class SpotifyAlbumType
    # == Annotations
    sig { returns(RSpotify::Album) }
    def object
      super
    end
  end
end
