# typed: true
# frozen_string_literal: true

class ScottickerSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes :name

  # == Associations
  has_one :image_blob, as: :image, serializer: ImageSerializer
end
