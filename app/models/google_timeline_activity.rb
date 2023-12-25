# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: google_timeline_activities
#
#  id         :uuid             not null, primary key
#  address    :string
#  confidence :integer          not null
#  duration   :tsrange          not null
#  location   :geography        not null, geometry, 4326
#  name       :string
#  type       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class GoogleTimelineActivity < ApplicationRecord
  # == Configuration
  self.inheritance_column = nil

  # == Attributes
  enumerize :type, in: %i[activity_segment place_visit]

  # == Validates
  validates :confidence, numericality: { only_integer: true, in: 0..3 }

  # == Geocoding
  sig { returns(RGeo::Geographic::Factory) }
  def self.location_factory
    RGeo::Geographic.spherical_factory(srid: 4326)
  end

  # == Methods
  sig do
    params(filename: T.any(String, Pathname))
      .returns(T::Array[GoogleTimelineActivity])
  end
  def self.import_from_file(filename)
    File.open(filename) do |file|
      data = JSON.parse(file.read)
      timeline_objects = data.fetch("timelineObjects")
      transaction do
        timeline_objects.map do |object|
          activity = from_timeline_object(object)
          activity.save!
          tag_logger do
            logger.debug(
              "Imported Google Timeline activity: #{activity.inspect}",
            )
          end
          activity
        end
      end
    end
  end

  sig do
    params(
      year: Integer,
      month: String,
    ).returns(T::Array[GoogleTimelineActivity])
  end
  def self.import_period(year, month)
    filename = Rails.root.join(
      "tmp/google_timeline_data",
      "#{year}_#{month.upcase}.json",
    )
    import_from_file(filename)
  end

  sig do
    params(object: T::Hash[String, T.untyped]).returns(GoogleTimelineActivity)
  end
  private_class_method def self.from_timeline_object(object)
    activity = T.let(new, GoogleTimelineActivity)
    if object.key?("activitySegment")
      activity.type = :activity_segment
      object = object.fetch("activitySegment")
    elsif object.key?("placeVisit")
      activity.type = :place_visit
      object = object.fetch("placeVisit")
    else
      raise "Couldn't detect activity type for timeline object: #{object}"
    end
    activity.duration = scoped do
      duration = object.fetch("duration")
      start_timestamp, end_timestamp = %w[
        startTimestamp
        endTimestamp
      ].map do |key|
        timestamp = duration.fetch(key)
        Time.zone.parse(timestamp)
      end
      start_timestamp..end_timestamp
    end
    case activity.type.to_sym
    when :activity_segment
      activity.location = scoped do
        start_location, end_location = %w[
          startLocation
          endLocation
        ].map do |key|
          location = object.fetch(key)
          latitude, longitude = %w[latitudeE7 longitudeE7].map do |key| # rubocop:disable Performance
            location.fetch(key) * (10**-7)
          end
          location_factory.point(longitude, latitude)
        end
        path_points = if (points = object.dig("simplifiedRawPath", "points"))
          points.map do |point|
            latitude, longitude = %w[latE7 lngE7].map do |key| # rubocop:disable Performance
              point.fetch(key) * (10**-7)
            end
            location_factory.point(longitude, latitude)
          end
        else
          []
        end
        location_factory.line_string([
          start_location,
          *path_points,
          end_location,
        ])
      end
      activity.confidence = scoped do
        confidence = object.fetch("confidence")
        case confidence
        when "HIGH"
          2
        when "MEDIUM"
          1
        when "LOW"
          0
        else
          raise "Unknown confidence value: #{confidence}"
        end
      end
    when :place_visit
      location = object.fetch("location")
      activity.name = location["name"]
      activity.address = location["address"]
      activity.location = scoped do
        latitude, longitude = %w[latitudeE7 longitudeE7].map do |key|
          location.fetch(key) * (10**-7)
        end
        location_factory.point(
          longitude,
          latitude,
        )
      end
      activity.confidence = scoped do
        place_confidence = object.fetch("placeConfidence")
        case place_confidence
        when "USER_CONFIRMED"
          3
        when "HIGH_CONFIDENCE"
          2
        when "MEDIUM_CONFIDENCE"
          1
        when "LOW_CONFIDENCE"
          0
        else
          raise "Unknown place confidence value: #{place_confidence}"
        end
      end
    else
      raise "Unknown activity type: #{activity.type}"
    end
    activity
  end

  sig { returns(TimelinePhoto::PrivateRelation) }
  def photos
    TimelinePhoto.where(timestamp: duration)
  end
end
