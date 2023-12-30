# typed: strict
# frozen_string_literal: true

module Sources
  class TimelinePhotosDuringActivity < BaseSource
    # == Fetching
    sig do
      params(activity_ids: T::Array[String])
        .returns(T::Array[T::Array[TimelinePhoto]])
    end
    def fetch(activity_ids)
      photos = T.let(
        TimelinePhoto
          .joins(
            "JOIN timeline_activities ON " \
              "timeline_activities.duration @> timeline_photos.timestamp",
          )
          .where(timeline_activities: { id: activity_ids })
          .select(
            *TimelinePhoto.column_names,
            "timeline_activities.id AS activity_id",
          )
          .to_a,
        T::Array[TimelinePhoto],
      )
      photos_by_activity_id = photos.group_by { |photo| photo["activity_id"] }
      activity_ids.map do |activity_id|
        photos_by_activity_id.fetch(activity_id) { [] }
      end
    end
  end
end
