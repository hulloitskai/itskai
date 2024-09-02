# typed: true
# frozen_string_literal: true

class CreateJourneySessionParticipations < ActiveRecord::Migration[7.1]
  def change
    create_table :journey_session_participations, id: :uuid do |t|
      t.belongs_to :session,
        null: false,
        foreign_key: { to_table: "journey_sessions" },
        type: :uuid
      t.uuid :participant_id, null: false
      t.string :participant_name, null: false
      t.text :goal, null: false

      t.timestamps
    end
  end
end
