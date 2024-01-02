# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateTimelinePhotoWithTimestamp < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :photo, T.nilable(TimelinePhoto)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :photo, Types::TimelinePhotoType

    # == Arguments
    argument :photo, Types::UploadInputType, as: :photo_signed_id
    argument :timestamp, Types::DateTimeType

    # == Resolver
    sig do
      params(
        photo_signed_id: String,
        timestamp: ActiveSupport::TimeWithZone,
      ).returns(Payload)
    end
    def resolve(photo_signed_id:, timestamp:)
      authorize!(to: :create?, with: TimelinePhotoPolicy)
      photo_blob = ActiveStorage::Blob.find_signed!(photo_signed_id)
      photo = TimelinePhoto.from_blob(photo_blob, timestamp:)
      if photo.save
        Payload.new(photo:)
      else
        Payload.new(errors: photo.input_field_errors)
      end
    end
  end
end
