# typed: true
# frozen_string_literal: true

class CreateLocationAccessGrants < ActiveRecord::Migration[7.0]
  def change
    create_table :location_access_grants, id: :uuid do |t|
      t.string :recipient, null: false
      t.string :password_digest, null: false

      t.timestamptz :created_at, null: false
      t.timestamptz :expires_at, null: false
    end
  end
end
