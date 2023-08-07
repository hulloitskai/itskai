# typed: true
# frozen_string_literal: true

class RemoveAccessTokenFromOAuthCredentials < ActiveRecord::Migration[7.0]
  def change
    remove_column :oauth_credentials, :access_token, :string
  end
end
