# typed: true
# frozen_string_literal: true

class DropInstagramCredentials < ActiveRecord::Migration[7.1]
  def change
    drop_table :instagram_credentials
  end
end
