# typed: true
# frozen_string_literal: true

class AddEmailToICloudCredentials < ActiveRecord::Migration[7.0]
  def change
    add_column :icloud_credentials, :email, :string, null: false
  end
end
