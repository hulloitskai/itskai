# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateDishwatcherDevice < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :device, T.nilable(Dishwatcher::Device)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :device, Types::DishwatcherDeviceType
    field :errors, [Types::InputFieldErrorType]

    # == Arguments
    argument :name, String

    # == Resolver
    sig { params(attributes: T.untyped).returns(Payload) }
    def resolve(**attributes)
      authorize!(to: :create?, with: Dishwatcher::DevicePolicy)
      device = Dishwatcher::Device.new(**attributes)
      if device.save
        Payload.new(device:)
      else
        Payload.new(errors: device.input_field_errors)
      end
    end
  end
end
