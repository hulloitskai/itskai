# typed: true
# frozen_string_literal: true

class PolymorphicToOnObsidianRelations < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :obsidian_relations, :obsidian_notes, column: :to_id
    add_column :obsidian_relations,
               :to_type,
               :string,
               null: false,
               default: "ObsidianNote"
    change_column_default :obsidian_relations, :to_type, :nil
  end
end
