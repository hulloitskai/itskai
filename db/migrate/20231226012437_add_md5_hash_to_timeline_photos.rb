# typed: true
# frozen_string_literal: true

class AddMd5HashToTimelinePhotos < ActiveRecord::Migration[7.1]
  def change
    add_column :timeline_photos, :md5_hash, :text, null: false
    add_index :timeline_photos, :md5_hash, unique: true
  end
end
