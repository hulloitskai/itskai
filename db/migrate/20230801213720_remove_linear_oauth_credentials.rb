# typed: true
# frozen_string_literal: true

class RemoveLinearOAuthCredentials < ActiveRecord::Migration[7.0]
  def up
    OAuthCredentials.delete_by(provider: :linear)
  end
end
