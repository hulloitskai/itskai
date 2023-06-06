# typed: true
# frozen_string_literal: true

class NonNullableImportedAtOnObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    ObsidianNote.where(imported_at: nil).update_all(imported_at: Time.current) # rubocop:disable Rails/SkipsModelValidations
    change_column_null :obsidian_notes, :imported_at, false
  end
end
