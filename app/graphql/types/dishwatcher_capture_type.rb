# typed: strict
# frozen_string_literal: true

module Types
  class DishwatcherCaptureType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :created_at, DateTimeType, null: false
    field :device, DishwatcherDeviceType, null: false

    # == Helpers
    sig { override.returns(Dishwatcher::Capture) }
    def object = super
  end
end
