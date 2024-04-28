# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateDishwatcherCapture < BaseMutation
    # == Fields
    field :capture, Types::DishwatcherCaptureType
    field :errors, [Types::InputFieldErrorType]

    # == Arguments
    argument :capture, Types::UploadInputType
    argument :device_id, ID, loads: Types::DishwatcherDeviceType

    # == Resolver
    sig do
      params(device: Dishwatcher::Device, attributes: T.untyped)
        .returns(T.any(
          { capture: T.nilable(Dishwatcher::Capture) },
          { errors: T.nilable(InputFieldErrors) },
        ))
    end
    def resolve(device:, **attributes)
      authorize!(
        device,
        to: :create?,
        with: Dishwatcher::CapturePolicy,
        context: {
          device_secret_key: dishwatcher_device_secret_key,
        },
      )
      capture = Dishwatcher::Capture.new(**attributes)
      if capture.save
        { capture: }
      else
        { errors: capture.input_field_errors }
      end
    end
  end
end
