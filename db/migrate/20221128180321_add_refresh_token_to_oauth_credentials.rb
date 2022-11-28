# typed: true
# frozen_string_literal: true

class AddRefreshTokenToOAuthCredentials < ActiveRecord::Migration[7.0]
  def change
    rename_column :oauth_credentials, :name, :provider
    add_column :oauth_credentials, :refresh_token, :string
  end
end
