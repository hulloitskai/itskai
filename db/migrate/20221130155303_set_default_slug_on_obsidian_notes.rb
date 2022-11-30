# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class SetDefaultSlugOnObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    reversible do |dir|
      dir.up do
        ObsidianNote.where(slug: nil).find_each(&:save!)
      end
      dir.down do
        ObsidianNote.update_all(slug: nil)
      end
    end

    change_column_null :obsidian_notes, :slug, false
  end
end
