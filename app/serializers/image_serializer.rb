# typed: true
# frozen_string_literal: true

class ImageSerializer < ApplicationSerializer
  # == Constants
  SIZES = [400, 940, 1400]

  # == Configuration
  identifier
  object_as :image, model: "ActiveStorage::Blob"

  # == Attributes
  attributes signed_id: { type: :string }

  attribute :src, type: :string do
    rails_representation_path(image)
  end

  attribute :src_set, type: :string do
    sources = SIZES.map do |size|
      representation = image.representation(resize_to_limit: [size, size])
      "#{rails_representation_path(representation)} #{size}w"
    end
    sources.join(", ")
  end
end
