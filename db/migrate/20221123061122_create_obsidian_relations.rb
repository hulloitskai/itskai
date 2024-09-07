# typed: true
# frozen_string_literal: true

class CreateObsidianRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :obsidian_relations, id: :uuid do |t|
      t.references :from,
                   null: false,
                   foreign_key: {
                     to_table: :obsidian_notes,
                   },
                   type: :uuid
      t.references :to,
                   null: false,
                   foreign_key: {
                     to_table: :obsidian_notes,
                   },
                   type: :uuid
      t.index %i[from_id to_id],
              unique: true,
              name: :index_obsidian_relations_uniqueness
    end
  end
end
