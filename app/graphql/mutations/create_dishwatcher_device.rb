# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateDishwatcherDevice < BaseMutation
    # == Fields
    field :device, Types::DishwatcherDeviceType
    field :errors, [Types::InputFieldErrorType]

    # == Arguments
    argument :name, String

    # == Resolver
    sig do
      params(attributes: T.untyped).returns(T.any(
        { device: T.nilable(Dishwatcher::Device) },
        { errors: T.nilable(InputFieldErrors) },
      ))
    end
    def resolve(**attributes)
      authorize!(to: :create?, with: Dishwatcher::DevicePolicy)
      device = Dishwatcher::Device.new(**attributes)
      if device.save
        { device: }
      else
        { errors: device.input_field_errors }
      end
    end
  end
end
