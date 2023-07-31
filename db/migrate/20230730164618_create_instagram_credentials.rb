# typed: true
# frozen_string_literal: true

class CreateInstagramCredentials < ActiveRecord::Migration[7.0]
  def change
    create_table :instagram_credentials, id: :uuid do |t|
      t.string :email, null: false
      t.string :password, null: false
      t.jsonb :session

      t.timestamps
    end
  end
end
