# typed: true
# frozen_string_literal: true

class AddUidToEventqrEvents < ActiveRecord::Migration[7.0]
  def change
    Eventqr::Event.delete_all
    add_column :eventqr_events, :uid, :string, null: false
    add_index :eventqr_events, :uid, unique: true
  end
end
