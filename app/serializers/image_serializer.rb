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

  attribute :src_set, type: :string do
    sources = SIZES.map do |size|
      representation = blob.representation(resize_to_limit: [size, size])
      "#{rails_representation_path(representation)} #{size}w"
    end
    sources.join(", ")
  end
end
