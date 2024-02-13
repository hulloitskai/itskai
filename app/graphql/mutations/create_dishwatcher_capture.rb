# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateDishwatcherCapture < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :capture, T.nilable(Dishwatcher::Capture)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :capture, Types::DishwatcherCaptureType
    field :errors, [Types::InputFieldErrorType]

    # == Arguments
    argument :capture, Types::UploadInputType
    argument :device_id, ID, loads: Types::DishwatcherDeviceType

    # == Resolver
    sig do
      params(device: Dishwatcher::Device, attributes: T.untyped)
        .returns(Payload)
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
        Payload.new(capture:)
      else
        Payload.new(errors: capture.input_field_errors)
      end
    end
  end
end
