# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: timeline_photos
#
#  id          :uuid             not null, primary key
#  coordinates :geography        point, 4326
#  timestamp   :datetime         not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class TimelinePhoto < ApplicationRecord
  include Identifiable

  # == Attachment
  has_one_attached :image

  # == Geocoding
  sig { returns(RGeo::Geographic::Factory) }
  def self.coordinates_factory
    RGeo::Geographic.spherical_factory(srid: 4326)
  end

  # == Methods
  sig { params(file: File).returns(TimelinePhoto) }
  def self.from_file(file)
    data = Exiftool.new(file.path)
    timestamp = data[:date_time_original_civil]
    longitude, latitude = data[:gps_longitude], data[:gps_latitude]
    if [latitude, longitude].all?(:present?)
      coordinates = coordinates_factory.point(latitude, longitude)
    end
    new(
      image: {
        io: file,
        filename: File.basename(file.path),
      },
      timestamp:,
      coordinates:,
    )
  end

  sig { params(year: Integer, month: String).returns(T::Array[TimelinePhoto]) }
  def self.import_period(year, month)
    folder = Rails.root.join(
      "tmp/google_timeline_data",
      "#{year}_#{month.upcase}",
    )
    folder.children.map do |filename|
      File.open(filename) do |file|
        photo = from_file(file)
        photo.save!
        tag_logger do
          logger.debug(
            "Imported timeline photo: #{photo.inspect}",
          )
        end
        photo
      end
    end
  end
end
