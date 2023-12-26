# typed: strict
# frozen_string_literal: true

module Types
  class TimelineActivityType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :address, String
    field :ended_at, DateTimeType, null: false
    field :location, GraphQL::Types::JSON, null: false
    field :name, String
    field :photos, [TimelinePhotoType], null: false
    field :started_at, DateTimeType, null: false
    field :timezone, TimezoneType, null: false
    field :type, TimelineActivityTypeType, null: false

    # == Resolvers
    sig { returns(Symbol) }
    def type
      object.type.to_sym
    end

    sig { returns(Time) }
    def started_at
      object.duration.begin
    end

    sig { returns(Time) }
    def ended_at
      object.duration.end
    end

    sig { returns(T::Hash[String, T.untyped]) }
    def location
      RGeo::GeoJSON.encode(object.location)
    end

    # == Helpers
    sig { override.returns(TimelineActivity) }
    def object = super
  end
end
