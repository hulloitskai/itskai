# typed: true
# frozen_string_literal: true

class CreateEventEmails < ActiveRecord::Migration[7.1]
  def change
    create_table :event_emails, id: :uuid do |t|
      t.timestamptz :timestamp, null: false
      t.string :subject
      t.text :body

      t.timestamps
    end
  end
end
