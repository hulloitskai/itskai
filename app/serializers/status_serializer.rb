# typed: true
# frozen_string_literal: true

class StatusSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes :emoji, :text, :created_at

  # == Associations
  has_one :image_blob, as: :image, serializer: ImageSerializer, nullable: true
end
