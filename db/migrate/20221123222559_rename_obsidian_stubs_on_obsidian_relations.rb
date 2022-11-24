# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class RenameObsidianStubsOnObsidianRelations < ActiveRecord::Migration[7.0]
  def change
    ObsidianRelation
      .where(to_type: "ObsidianGhostNote")
      .update_all(to_type: "ObsidianStub")
  end
end
