# typed: true
# frozen_string_literal: true

class ChangeUniquenessConstraintsOnOAuthCredentials < ActiveRecord::Migration[7.0] # rubocop:disable Layout/LineLength
  def change
    change_table :oauth_credentials do |t|
      t.remove_index :provider
      t.remove_index :uid
      t.index %i[provider uid], unique: true
    end
  end
end
