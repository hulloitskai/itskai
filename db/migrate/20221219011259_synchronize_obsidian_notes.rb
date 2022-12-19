# typed: true
# frozen_string_literal: true

class SynchronizeObsidianNotes < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def up
    ICloud.start
    Obsidian.start
    ObsidianNote.synchronize_all(force: true)
  end
end
