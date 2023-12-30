# typed: strict
# frozen_string_literal: true

module Mutations
  class ImportTimelineActivities < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :import_count, Integer
    end

    # == Fields
    field :import_count, Integer, null: false

    # == Arguments
    argument :location_history,
             Types::UploadInputType,
             as: :location_history_signed_id

    # == Resolver
    sig { params(location_history_signed_id: String).returns(Payload) }
    def resolve(location_history_signed_id:)
      authorize!(to: :import?, with: TimelineActivityPolicy)
      location_history_blob = ActiveStorage::Blob.find_signed!(
        location_history_signed_id,
      )
      activities = TimelineActivity.import_from_google_location_history_upload!(
        location_history_blob,
      )
      Payload.new(import_count: activities.size)
    end
  end
end
