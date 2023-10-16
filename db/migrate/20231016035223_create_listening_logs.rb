# typed: true
# frozen_string_literal: true

class CreateListeningLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :listening_logs, id: :uuid do |t|
      t.string :spotify_track_id, null: false, index: true
      t.timestamptz :created_at, null: false
    end
  end
end
