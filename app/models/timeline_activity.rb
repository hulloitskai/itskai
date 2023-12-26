# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: timeline_activities
#
#  id            :uuid             not null, primary key
#  address       :string
#  confidence    :integer          not null
#  duration      :tsrange          not null
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
class TimelineActivity < ApplicationRecord
  # == Configuration
  self.inheritance_column = nil

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

  # == Methods
  sig do
    params(f: ActionDispatch::Http::UploadedFile)
      .returns(T::Array[TimelineActivity])
  end
  def self.import_from_google_location_history_upload!(f)
    data = JSON.parse(f.read)
    timeline_objects = T.let(
      data.fetch("timelineObjects"),
      T::Array[T::Hash[String, T.untyped]],
    )
    transaction do
      timeline_objects.filter_map do |object|
        activity = from_google_location_history_timeline_object(object)
        if activity.new_record?
          activity.save!
          tag_logger do
            logger.debug(
              "Imported Google Timeline activity: #{activity.inspect}",
            )
          end
          activity
        else
          tag_logger do
            logger.warn(
              "Already imported Google Timeline activity: #{activity.inspect}",
            )
          end
          nil
        end
      end
    end
  end

  sig { returns(TimezoneFinder::TimezoneFinder) }
  def self.timezone_finder
    @timezone_finder ||= T.let(
      TimezoneFinder.create,
      T.nilable(TimezoneFinder::TimezoneFinder),
    )
  end

  sig do
    params(timeline_object: T::Hash[String, T.untyped])
      .returns(TimelineActivity)
  end
  private_class_method def self.from_google_location_history_timeline_object(timeline_object) # rubocop:disable Layout/LineLength
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
    duration = scoped do |; duration| # rubocop:disable Layout/SpaceAroundBlockParameters
      duration = timeline_object.fetch("duration")
      start_timestamp, end_timestamp = %w[
        startTimestamp
        endTimestamp
      ].map do |key|
        timestamp = duration.fetch(key)
        T.let(Time.zone.parse(timestamp), Time)
      end
      start_timestamp..end_timestamp
    end
    activity = find_or_initialize_by(type:, duration:)
    return activity if activity.persisted?
    case activity.type.to_sym
    when :activity_segment
      activity.location = scoped do
        start_location, end_location = %w[
          startLocation
          endLocation
        ].map do |key|
          location = timeline_object.fetch(key)
          latitude, longitude = %w[latitudeE7 longitudeE7].map do |key| # rubocop:disable Performance/CollectionLiteralInLoop
            location.fetch(key) * (10**-7)
          end
          location_factory.point(longitude, latitude)
        end
        path_points = if (points = timeline_object.dig(
          "simplifiedRawPath",
          "points",
        ))
          points.map do |point|
            latitude, longitude = %w[latE7 lngE7].map do |key| # rubocop:disable Performance/CollectionLiteralInLoop
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
        confidence = timeline_object.fetch("confidence")
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
      location = timeline_object.fetch("location")
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
        place_confidence = timeline_object.fetch("placeConfidence")
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

  private

  # == Callbacks
  sig { void }
  def set_timezone_name_from_location
    point = case location.geometry_type
    when RGeo::Feature::Point
      location
    when RGeo::Feature::LineString
      location.point_n(0)
    else
      raise "Unknown geometry type: #{location.geometry_type}"
    end
    self.timezone_name = self.class.timezone_finder.timezone_at(
      lat: point.latitude,
      lng: point.longitude,
    )
  end
end
