# typed: true
# frozen_string_literal: true

class ChangeExpirationDateToFloatOnCookies < ActiveRecord::Migration[7.0]
  def change
    change_column :cookies, :expiration_date, :float
  end
end
