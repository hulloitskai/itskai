# typed: true
# frozen_string_literal: true

class RemoveUserIdFromICloudCredentials < ActiveRecord::Migration[7.0]
  def change
    remove_column :icloud_credentials, :user_id, :string
  end
end
