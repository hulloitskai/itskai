# typed: true
# frozen_string_literal: true

class CreateAlerts < ActiveRecord::Migration[7.1]
  def change
    create_table :alerts, id: :uuid do |t|
      t.text :body, null: false
      t.string :title, null: false
      t.timestamptz :created_at, null: false
    end
  end
end
