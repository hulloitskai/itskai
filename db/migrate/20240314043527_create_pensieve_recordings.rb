# typed: true
# frozen_string_literal: true

class CreatePensieveRecordings < ActiveRecord::Migration[7.1]
  def change
    create_table :pensieve_recordings, id: :uuid do |t|
      t.text :transcription
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
