# typed: true
# frozen_string_literal: true

class DropEventqrEvents < ActiveRecord::Migration[7.0]
  def change
    drop_table :eventqr_events
  end
end
