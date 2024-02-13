# typed: strict
# frozen_string_literal: true

module Types
  class DishwatcherDeviceType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :created_at, DateTimeType, null: false
    field :name, String, null: false
    field :secret_key, String, null: false

    # == Helpers
    sig { override.returns(Dishwatcher::Device) }
    def object = super
  end
end
