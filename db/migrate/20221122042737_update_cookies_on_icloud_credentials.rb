# typed: true
# frozen_string_literal: true

class UpdateCookiesOnICloudCredentials < ActiveRecord::Migration[7.0]
  def change
    change_table :icloud_credentials do |t|
      t.change :cookies, :text
      t.jsonb :session
    end
  end
end
