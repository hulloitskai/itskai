# typed: true
# frozen_string_literal: true

class RenameMd5HashOnTimelinePhotosToFingerprint < ActiveRecord::Migration[7.1]
  def change
    rename_column :timeline_photos, :md5_hash, :fingerprint
  end
end
