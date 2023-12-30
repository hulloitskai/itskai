# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: timeline_photos
#
#  id          :uuid             not null, primary key
#  coordinates :geography        point, 4326
#  fingerprint :text             not null
#  timestamp   :datetime         not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_timeline_photos_on_fingerprint  (fingerprint) UNIQUE
#
class TimelinePhoto < ApplicationRecord
  include Identifiable

  # == Attachment
  has_one_attached :image

  # == Validations
  validates :image, :timestamp, :fingerprint, presence: true
  validates :fingerprint, uniqueness: true

  # == Geocoding
  sig { returns(RGeo::Geographic::Factory) }
  def self.coordinates_factory
    RGeo::Geographic.spherical_factory(srid: 4326)
  end

  # == Constructors
  sig { params(blob: ActiveStorage::Blob).returns(TimelinePhoto) }
  def self.from_blob(blob)
    blob.open do |file|
      fingerprint = Digest::MD5.file(file.to_path).hexdigest
      photo = find_or_initialize_by(fingerprint:)
      if photo.new_record?
        data = Exiftool.new(file.to_path)
        photo.image.attach(blob)
        photo.timestamp = data[:sub_sec_date_time_original] ||
          data[:sub_sec_create_date] or
          raise "Couldn't detect timestamp"
        longitude, latitude = data[:gps_longitude], data[:gps_latitude]
        if [latitude, longitude].all?(:present?)
          photo.coordinates = coordinates_factory.point(latitude, longitude)
        end
      end
      photo
    end
  end

  sig do
    params(blobs: T::Enumerable[ActiveStorage::Blob])
      .returns(T::Array[TimelinePhoto])
  end
  def self.import_from_bulk_upload!(blobs)
    transaction do
      blobs.filter_map do |blob|
        photo = from_blob(blob)
        if photo.new_record?
          photo.save!
          tag_logger do
            logger.debug("Imported timeline photo: #{photo.inspect}")
          end
          photo
        else
          tag_logger do
            logger.warn("Already timeline photo: #{photo.inspect}")
          end
          nil
        end
      end
    end
  end
end
