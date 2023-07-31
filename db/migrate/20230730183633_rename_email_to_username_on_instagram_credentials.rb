# typed: true
# frozen_string_literal: true

class RenameEmailToUsernameOnInstagramCredentials < ActiveRecord::Migration[7.0]
  def change
    rename_column :instagram_credentials, :email, :username
  end
end
