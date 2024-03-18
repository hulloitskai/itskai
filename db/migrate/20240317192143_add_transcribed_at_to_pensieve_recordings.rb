# typed: true
# frozen_string_literal: true

class AddTranscribedAtToPensieveRecordings < ActiveRecord::Migration[7.1]
  def change
    add_column :pensieve_recordings, :transcribed_at, :timestamptz

    up_only do
      execute <<~SQL.squish
        UPDATE pensieve_recordings
        SET transcribed_at = NOW()
        WHERE transcription IS NOT NULL
      SQL
    end
  end
end
