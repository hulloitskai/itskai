# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: timeline_photos
#
#  id          :uuid             not null, primary key
#  fingerprint :text             not null
#  timestamp   :datetime         not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_timeline_photos_on_fingerprint  (fingerprint) UNIQUE
#  index_timeline_photos_on_timestamp    (timestamp)
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
  sig do
    params(
      blob: ActiveStorage::Blob,
      timestamp: T.nilable(ActiveSupport::TimeWithZone),
    )
      .returns(TimelinePhoto)
  end
  def self.from_blob(blob, timestamp: nil)
    blob.open do |file|
      fingerprint = Digest::MD5.file(file.to_path).hexdigest
      photo = find_or_initialize_by(fingerprint:)
      if photo.new_record?
        data = Exiftool.new(file.to_path)
        photo.image.attach(blob)
        if timestamp.present?
          photo.timestamp = timestamp
        else
          photo.timestamp = data[:sub_sec_date_time_original] ||
            data[:sub_sec_create_date] or
            raise "Couldn't detect timestamp"
        end
      end
      photo
    end
  end

  # == Importing
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
