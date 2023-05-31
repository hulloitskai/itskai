# typed: true
# frozen_string_literal: true

class CreateCookies < ActiveRecord::Migration[7.0]
  def change
    create_table :cookies, id: :uuid do |t|
      t.string :domain, null: false, index: true
      t.string :name, null: false
      t.string :value, null: false
      t.boolean :session, null: false
      t.boolean :host_only, null: false
      t.integer :expiration_date
      t.string :path, null: false
      t.boolean :http_only, null: false
      t.boolean :secure, null: false
      t.string :same_site, null: false

      t.datetime :created_at, null: false
    end
  end
end
