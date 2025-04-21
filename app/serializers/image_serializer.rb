# typed: true
# frozen_string_literal: true

class ImageSerializer < FileSerializer
  # == Constants
  SIZES = [320, 720, 1400]

  # == Configuration
  object_as :blob, model: "ActiveStorage::Blob"

  # == Attributes
  attribute :src, type: :string do
    rails_representation_path(blob)
  end

  attribute :srcset, type: :string do
    if blob.content_type&.start_with?("image/gif")
      rails_representation_path(blob)
    else
      sources = SIZES.map do |size|
        representation = blob.representation(resize_to_limit: [size, size])
        "#{rails_representation_path(representation)} #{size}w"
      end
      sources.join(", ")
    end
  end

  attribute :dimensions, type: "Dimensions", nullable: true do
    blob.analyze unless blob.analyzed?
    width, height = blob.metadata.values_at("width", "height")
    if width.present? && height.present?
      { width:, height: }
    end
  end
end
