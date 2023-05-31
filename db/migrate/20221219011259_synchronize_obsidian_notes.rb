# typed: true
# frozen_string_literal: true

class SynchronizeObsidianNotes < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def up
    ICloudService.start
    ObsidianService.start
    ObsidianNote.sync_all(force: true)
  end
end
