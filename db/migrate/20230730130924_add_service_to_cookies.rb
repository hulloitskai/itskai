# typed: true
# frozen_string_literal: true

class AddServiceToCookies < ActiveRecord::Migration[7.0]
  def change
    add_column :cookies, :service, :string, null: false
    add_index :cookies, :service
    remove_index :cookies, :domain
  end
end
