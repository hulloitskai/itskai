# typed: true
# frozen_string_literal: true

class AddAccessTokenToOAuthCredentials < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    OAuthCredentials.destroy_all
    OAuthCredentials.transaction do
      add_column :oauth_credentials, :access_token, :string, null: false
    end
  end
end
