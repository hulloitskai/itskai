# typed: strict
# frozen_string_literal: true

module Mutations
  class UpdateDishwatchDevice < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :device, T.nilable(Dishwatcher::Device)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :device, Types::DishwatcherDeviceType
    field :errors, [Types::InputFieldErrorType]

    # == Arguments
    argument :device_id, ID, loads: Types::DishwatcherDeviceType
    argument :name, String

    # == Resolver
    sig do
      params(device: Dishwatcher::Device, attributes: T.untyped)
        .returns(Payload)
    end
    def resolve(device:, **attributes)
      authorize!(device, to: :update?)
      if device.update(attributes)
        Payload.new(device:)
      else
        Payload.new(errors: device.input_field_errors)
      end
    end
  end
end
