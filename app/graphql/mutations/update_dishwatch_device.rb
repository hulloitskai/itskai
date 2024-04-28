# typed: strict
# frozen_string_literal: true

module Mutations
  class UpdateDishwatchDevice < BaseMutation
    # == Fields
    field :device, Types::DishwatcherDeviceType
    field :errors, [Types::InputFieldErrorType]

    # == Arguments
    argument :device_id, ID, loads: Types::DishwatcherDeviceType
    argument :name, String

    # == Resolver
    sig do
      params(device: Dishwatcher::Device, attributes: T.untyped)
        .returns(T.any(
          { device: Dishwatcher::Device },
          { errors: InputFieldErrors },
        ))
    end
    def resolve(device:, **attributes)
      authorize!(device, to: :update?)
      if device.update(attributes)
        { device: }
      else
        { errors: device.input_field_errors }
      end
    end
  end
end
