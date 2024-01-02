# typed: strict
# frozen_string_literal: true

module Types
  class TimelineActivityType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :address, String
    field :distance_meters, Float, null: false
    field :ended_at, DateTimeType, null: false
    field :location, GraphQL::Types::JSON, null: false
    field :movement_speed_meters_per_second, Float, null: false
    field :name, String
    field :photos, [TimelinePhotoType], null: false
    field :started_at, DateTimeType, null: false
    field :timezone, TimezoneType, null: false
    field :timezone_name, String, null: false
    field :type, TimelineActivityTypeType, null: false

    # == Resolvers
    sig { returns(Time) }
    def ended_at
      object.duration.end
    end

    sig { returns(T::Hash[String, T.untyped]) }
    def location
      RGeo::GeoJSON.encode(object.location)
    end

    sig { returns(GraphQL::Dataloader::Request) }
    def photos
      dataloader
        .with(Sources::TimelinePhotosDuringActivity)
        .request(object.id)
    end

    sig { returns(Time) }
    def started_at
      object.duration.begin
    end

    sig { returns(Symbol) }
    def type
      object.type.to_sym
    end

    # == Helpers
    sig { override.returns(TimelineActivity) }
    def object = super
  end
end
