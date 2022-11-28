# typed: true
# frozen_string_literal: true

class RenameOAuthProvidersToOAuthCredentials < ActiveRecord::Migration[7.0]
  def change
    rename_table :oauth_providers, :oauth_credentials
  end
end
