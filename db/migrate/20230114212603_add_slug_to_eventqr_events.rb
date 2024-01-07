# typed: true
# frozen_string_literal: true

class AddSlugToEventqrEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :eventqr_events, :slug, :string
    change_column_null :eventqr_events, :slug, false
  end
end
