# typed: true
# frozen_string_literal: true

class CreateJourneySessions < ActiveRecord::Migration[7.1]
  def change
    create_table :journey_sessions, id: :uuid do |t|
      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
