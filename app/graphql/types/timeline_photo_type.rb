# typed: strict
# frozen_string_literal: true

module Types
  class TimelinePhotoType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :coordinates, CoordinatesType
    field :image, ImageType, null: false
    field :taken_at, DateTimeType, null: false, method: :timestamp

    # == Resolvers
    sig { returns(GraphQL::Dataloader::Request) }
    def image
      dataloader
        .with(Sources::AttachedBlob, TimelinePhoto, :image)
        .request(object.id)
    end

    # == Helpers
    sig { override.returns(TimelinePhoto) }
    def object = super
  end
end
