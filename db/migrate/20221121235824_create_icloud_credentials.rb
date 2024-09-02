# typed: true
# frozen_string_literal: true

class CreateICloudCredentials < ActiveRecord::Migration[7.0]
  def change
    create_table :icloud_credentials, id: :uuid do |t|
      t.belongs_to :user,
        null: false,
        foreign_key: true,
        type: :uuid,
        index: {
          unique: true,
        }
      t.string :password, null: false
      t.binary :cookies
      t.timestamps
    end
  end
end
