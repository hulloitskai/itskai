# typed: true
# frozen_string_literal: true

class CreateOAuthProviders < ActiveRecord::Migration[7.0]
  def change
    create_table :oauth_providers, id: :uuid do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :uid, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
