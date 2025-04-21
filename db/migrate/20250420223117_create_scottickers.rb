# typed: true
# frozen_string_literal: true

class CreateScottickers < ActiveRecord::Migration[8.0]
  def change
    create_table :scottickers, id: :uuid do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :scottickers, :name, unique: true
  end
end
