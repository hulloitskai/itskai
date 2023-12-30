# typed: strict
# frozen_string_literal: true

module Mutations
  class ImportTimelinePhotos < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :import_count, Integer
    end

    # == Fields
    field :import_count, Integer, null: false

    # == Arguments
    argument :photos, [Types::UploadInputType], as: :photo_signed_ids

    # == Resolver
    sig { params(photo_signed_ids: T::Array[String]).returns(Payload) }
    def resolve(photo_signed_ids:)
      authorize!(to: :import?, with: TimelinePhotoPolicy)
      photo_blobs = photo_signed_ids.map do |signed_id|
        ActiveStorage::Blob.find_signed!(signed_id)
      end
      photos = TimelinePhoto.import_from_bulk_upload!(photo_blobs)
      Payload.new(import_count: photos.size)
    end
  end
end
