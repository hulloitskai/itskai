# typed: strict
# frozen_string_literal: true

module Types
  class TimelinePhotoType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :coordinates, CoordinatesType
    field :image, ImageType, null: false, method: :image_blob
    field :taken_at, DateTimeType, null: false, method: :timestamp

    # == Helpers
    sig { override.returns(TimelinePhoto) }
    def object = super
  end
end
