# typed: true
# frozen_string_literal: true

class CreateSenecaMoodLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :seneca_mood_logs, id: :uuid do |t|
      t.integer :valence, null: false
      t.timestamptz :created_at, null: false
    end
  end
end
