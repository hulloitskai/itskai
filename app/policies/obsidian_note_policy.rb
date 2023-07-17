# typed: true
# frozen_string_literal: true

class ObsidianNotePolicy < ApplicationPolicy
  # == Rules
  def show?
    record = T.cast(self.record, ObsidianNote)
    !record.hidden?
  end

  def read?
    record = T.cast(self.record, ObsidianNote)
    record.published?
  end

  relation_scope do |relation|
    active_user&.owner? ? relation : relation.where(hidden: false)
  end
end
