# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class NullBlankBlurbsOnObsidianNotes < ActiveRecord::Migration[7.0]
  def change
    rows = ObsidianNote.where(blurb: "").update_all(blurb: nil)
    Rails.logger.info("#{rows} notes updated")
  end
end
