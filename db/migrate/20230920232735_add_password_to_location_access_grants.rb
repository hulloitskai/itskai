# typed: true
# frozen_string_literal: true

class AddPasswordToLocationAccessGrants < ActiveRecord::Migration[7.0]
  def change
    change_table :location_access_grants do |t|
      t.string :password, null: false, index: true
      t.remove :password_digest, type: :string, null: false
    end
  end
end
