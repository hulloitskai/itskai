# typed: true
# frozen_string_literal: true

class DropCookies < ActiveRecord::Migration[7.1]
  def change
    drop_table :cookies
  end
end
