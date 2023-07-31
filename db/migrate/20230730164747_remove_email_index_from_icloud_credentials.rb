# typed: true
# frozen_string_literal: true

class RemoveEmailIndexFromICloudCredentials < ActiveRecord::Migration[7.0]
  def change
    remove_index :icloud_credentials, :email
  end
end
