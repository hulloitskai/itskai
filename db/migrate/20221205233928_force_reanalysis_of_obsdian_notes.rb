# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class ForceReanalysisOfObsdianNotes < ActiveRecord::Migration[7.0]
  def up
    ObsidianNote
      .where(plain_blurb: nil)
      .update_all(blurb: nil, analyzed_at: nil)
  end
end
