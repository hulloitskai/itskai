# typed: true
# frozen_string_literal: true

class RenameSecurityTokenToTokenOnFriends < ActiveRecord::Migration[7.1]
  def change
    rename_column :friends, :security_token, :token
  end
end
