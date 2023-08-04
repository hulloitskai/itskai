# typed: true
# frozen_string_literal: true

class AddSignalToScottcalls < ActiveRecord::Migration[7.0]
  def change
    up_only { Scottcall.destroy_all }
    remove_column :scottcalls, :message, :text, null: false
    add_column :scottcalls, :signal, :string, null: false
  end
end
