# typed: strict
# frozen_string_literal: true

module Types
  class ImageType < BaseObject
    # == Interfaces
    implements NodeType
    implements UploadType

    # == Fields
    field :src, String, null: false do
      argument :size, ImageSizeType, required: false, default_value: :md
    end

    # == Resolvers
    sig { params(size: Symbol).returns(String) }
    def src(size:)
      limit = resize_limit(size)
      representation = object.representation(resize_to_limit: limit)
      rails_representation_url(representation)
    end

    # == Helpers
    sig { override.returns(ActiveStorage::Blob) }
    def object = super

    private

    # == Helpers
    sig { params(size: Symbol).returns([Integer, Integer]) }
    def resize_limit(size)
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
