# typed: true
# frozen_string_literal: true

class IndexICloudCredentialsOnEmail < ActiveRecord::Migration[7.0]
  def change
    add_index :icloud_credentials, :email, unique: true
  end
end
