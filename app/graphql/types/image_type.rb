# typed: strict
# frozen_string_literal: true

module Types
  class ImageType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :signed_id, String, null: false
    field :url, String, null: false do
      argument :size, ImageSizeType, required: false, default_value: :md
    end

    # == Resolvers
    sig { params(size: Symbol).returns(String) }
    def url(size:)
      limit = limit_for_size(size)
      representation = object.representation(resize_to_limit: limit)
      representation.processed.url
    end

    # == Helpers
    sig { override.returns(ActiveStorage::Blob) }
    def object = super

    private

    # == Helpers
    sig { params(size: Symbol).returns([Integer, Integer]) }
    def limit_for_size(size)
      case size
      when :sm then [400, 400]
      when :md then [940, 940]
      when :lg then [1400, 2400]
      else
        raise "Invalid image size: #{size}"
      end
    end
  end
end
