# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: timeline_activities
#
#  id            :uuid             not null, primary key
#  address       :string
#  confidence    :integer          not null
#  duration      :tstzrange
#  location      :geography        not null, geometry, 4326
#  name          :string
#  timezone_name :string           not null
#  type          :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_timeline_activities_uniqueness  (type,duration) UNIQUE
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class TimelineActivity < ApplicationRecord
  # == Configuration
  self.inheritance_column = nil

  Location = T.type_alias do
    T.any(
      RGeo::Feature::Point,
      RGeo::Feature::LineString,
    )
  end

  # == Attributes
  enumerize :type, in: %i[activity_segment place_visit]

  sig { returns(TZInfo::Timezone) }
  def timezone
    if (name = timezone_name)
      TZInfo::Timezone.get(name)
    end
  end

  # == Validates
  validates :confidence,
    presence: true,
    numericality: { only_integer: true, in: 0..3 }
  validates :duration, presence: true, uniqueness: { scope: :type }
  validates :timezone_name, presence: true
  validates :location, presence: true

  # == Callbacks
  before_validation :set_timezone_name_from_location, if: :location_changed?

  # == Geocoding
  sig { returns(RGeo::Geographic::Factory) }
  def self.location_factory
    RGeo::Geographic.spherical_factory(srid: 4326)
  end

  # == Constructors
  sig do
    params(timeline_object: T::Hash[String, T.untyped])
      .returns(TimelineActivity)
  end
  def self.from_google_timeline_object(timeline_object)
    type = if timeline_object.key?("activitySegment")
      timeline_object = timeline_object.fetch("activitySegment")
      :activity_segment
    elsif timeline_object.key?("placeVisit")
      timeline_object = timeline_object.fetch("placeVisit")
      :place_visit
    else
      raise "Couldn't detect activity type for timeline object: " \
        "#{timeline_object}"
    end
    duration = parse_google_timeline_object_duration(
      timeline_object.fetch("duration"),
    )
    activity = find_or_initialize_by(type:, duration:)
    return activity if activity.persisted?
    case activity.type.to_sym
    when :activity_segment
      activity.location = parse_google_activity_segment_location(
        timeline_object,
      )
      activity.confidence = parse_google_activity_segment_confidence(
        timeline_object.fetch("confidence"),
      )
    when :place_visit
      location = timeline_object.fetch("location")
      activity.name = location["name"]
      activity.address = location["address"]
      activity.location = point_from_google_location(location)
      activity.confidence = parse_google_place_confidence(
        timeline_object.fetch("placeConfidence"),
      )
    else
      raise "Unknown activity type: #{activity.type}"
    end
    activity
  end

  sig do
    params(location: T::Hash[String, T.untyped])
      .returns(RGeo::Feature::Point)
  end
  private_class_method def self.point_from_google_location(location)
    latitude, longitude = %w[latitudeE7 longitudeE7].map do |key|
      location.fetch(key) * (10**-7)
    end
    location_factory.point(longitude, latitude)
  end

  sig do
    params(activity_segment: T::Hash[String, T.untyped])
      .returns(RGeo::Feature::LineString)
  end
  private_class_method def self.parse_google_activity_segment_location(
    activity_segment
  )
    start_location, end_location = %w[
      startLocation
      endLocation
    ].map do |key|
      point_from_google_location(activity_segment.fetch(key))
    rescue
      with_log_tags do
        logger.warn(
          "Couldn't parse `#{key}' for activity segment: #{activity_segment}",
        )
      end
      nil
    end
    path_points = if (points = activity_segment.dig(
      "simplifiedRawPath",
      "points",
    ))
      points.map do |point|
        latitude, longitude = %w[latE7 lngE7].map do |key|
          point.fetch(key) * (10**-7)
        end
        location_factory.point(longitude, latitude)
      end
    else
      []
    end
    points = [ start_location, *path_points, end_location ]
    location_factory.line_string(points.compact)
  end

  sig do
    params(duration: T::Hash[String, T.untyped])
      .returns(T::Range[ActiveSupport::TimeWithZone])
  end
  def self.parse_google_timeline_object_duration(duration)
    start_timestamp, end_timestamp = %w[
      startTimestamp
      endTimestamp
    ].map do |key|
      timestamp = duration.fetch(key)
      T.let(Time.zone.parse(timestamp), ActiveSupport::TimeWithZone)
    end
    start_timestamp..end_timestamp
  end

  sig { params(confidence: String).returns(Integer) }
  private_class_method def self.parse_google_activity_segment_confidence(
    confidence
  )
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

  sig { params(place_confidence: String).returns(Integer) }
  private_class_method def self.parse_google_place_confidence(place_confidence)
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

  # == Importing
  sig { params(blob: ActiveStorage::Blob).returns(T::Array[TimelineActivity]) }
  def self.import_from_google_location_history_upload!(blob)
    blob.open do |file|
      body = T.must(file.read)
      data = MultiJson.load(body)
      timeline_objects = T.let(
        data.fetch("timelineObjects"),
        T::Array[T::Hash[String, T.untyped]],
      )
      transaction do
        timeline_objects.filter_map do |object|
          activity = from_google_timeline_object(object)
          if activity.new_record?
            activity.save!
            with_log_tags do
              logger.debug("Imported timeline activity: #{activity.inspect}")
            end
            activity
          else
            with_log_tags do
              logger.warn("Already timeline activity: #{activity.inspect}")
            end
            nil
          end
        end
      end
    end
  end

  sig { returns(TimelinePhoto::PrivateRelation) }
  def photos
    TimelinePhoto.where(timestamp: duration)
  end

  sig { returns(Float) }
  def distance_meters
    case location.geometry_type
    when RGeo::Feature::Point
      0.0
    when RGeo::Feature::LineString
      T.cast(location, RGeo::Feature::LineString).length
    else
      raise "Unknown geometry type: #{location.geometry_type}"
    end
  end

  sig { returns(Float) }
  def movement_speed_meters_per_second
    distance_meters / (duration.end - duration.begin)
  end

  # == Helpers
  sig { returns(TimezoneFinder::TimezoneFinder) }
  def self.timezone_finder
    @timezone_finder ||= TimezoneFinder.create
  end
  delegate :timezone_finder, to: :class

  private

  # == Callbacks
  sig { void }
  def set_timezone_name_from_location
    point = case location.geometry_type
    when RGeo::Feature::Point
      location
    when RGeo::Feature::LineString
      T.cast(location, RGeo::Feature::LineString).point_n(0)
    else
      raise "Unknown geometry type: #{location.geometry_type}"
    end
    self.timezone_name = timezone_finder.timezone_at(
      lat: point.latitude,
      lng: point.longitude,
    )
  end
end
