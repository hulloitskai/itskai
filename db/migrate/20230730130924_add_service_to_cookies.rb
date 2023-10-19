# typed: ignore
# frozen_string_literal: true

class AddServiceToCookies < ActiveRecord::Migration[7.0]
  def change
    up_only { Cookie.destroy_all }
    add_column :cookies, :service, :string, null: false
    add_index :cookies, :service
    remove_index :cookies, :domain
  end
end
