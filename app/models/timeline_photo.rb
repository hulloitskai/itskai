# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: timeline_photos
#
#  id          :uuid             not null, primary key
#  coordinates :geography        point, 4326
#  md5_hash    :text             not null
#  timestamp   :datetime         not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_timeline_photos_on_md5_hash  (md5_hash) UNIQUE
#
class TimelinePhoto < ApplicationRecord
  include Identifiable

  # == Attachment
  has_one_attached :image

  # == Validations
  validates :image, :timestamp, :md5_hash, presence: true
  validates :md5_hash, uniqueness: true

  # == Geocoding
  sig { returns(RGeo::Geographic::Factory) }
  def self.coordinates_factory
    RGeo::Geographic.spherical_factory(srid: 4326)
  end

  # == Methods
  sig { params(f: T.any(File, Tempfile)).returns(TimelinePhoto) }
  def self.from_file(f)
    photo = find_or_initialize_by(
      md5_hash: Digest::MD5.file(f.to_path).hexdigest,
    )
    return photo if photo.persisted?
    data = Exiftool.new(f.to_path)
    photo.image.attach(io: f, filename: f.to_path)
    photo.timestamp = data[:sub_sec_date_time_original] ||
      data[:sub_sec_create_date] or
      raise "Couldn't detect timestamp"
    longitude, latitude = data[:gps_longitude], data[:gps_latitude]
    if [latitude, longitude].all?(:present?)
      photo.coordinates = coordinates_factory.point(latitude, longitude)
    end
    photo
  end

  sig do
    params(
      files: T::Enumerable[ActionDispatch::Http::UploadedFile],
    ).returns(T::Array[TimelinePhoto])
  end
  def self.import_from_bulk_upload!(files)
    transaction do
      files.filter_map do |f|
        photo = from_file(f.tempfile)
        if photo.new_record?
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
end
