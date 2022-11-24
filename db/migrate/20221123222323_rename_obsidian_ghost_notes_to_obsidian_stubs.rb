# typed: true
# frozen_string_literal: true

class RenameObsidianGhostNotesToObsidianStubs < ActiveRecord::Migration[7.0]
  def change
    rename_table :obsidian_ghost_notes, :obsidian_stubs
  end
end
