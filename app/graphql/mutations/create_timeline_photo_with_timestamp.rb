# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateTimelinePhotoWithTimestamp < BaseMutation
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
      ).returns(T.any(
        { photo: T.nilable(TimelinePhoto) },
        { errors: T.nilable(InputFieldErrors) },
      ))
    end
    def resolve(photo_signed_id:, timestamp:)
      authorize!(to: :create?, with: TimelinePhotoPolicy)
      photo_blob = ActiveStorage::Blob.find_signed!(photo_signed_id)
      photo = TimelinePhoto.from_blob(photo_blob, timestamp:)
      if photo.save
        { photo: }
      else
        { errors: photo.input_field_errors }
      end
    end
  end
end
