# typed: true
# frozen_string_literal: true

class CreateCathendantMemos < ActiveRecord::Migration[7.1]
  def change
    create_table :cathendant_memos, id: :uuid do |t|
      t.string :from, null: false
      t.text :transcript
      t.timestamptz :transcribed_at

      t.timestamps
    end
  end
end
