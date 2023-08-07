# typed: true
# frozen_string_literal: true

class AddNonNullRefreshTokenConstraintToOAuthCredentials < ActiveRecord::Migration[7.0]  # rubocop:disable Layout/LineLength
  def change
    change_column_null :oauth_credentials, :refresh_token, false
  end
end
