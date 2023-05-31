# typed: true
# frozen_string_literal: true

class ObsidianNotePolicy < ApplicationPolicy
  # == Rules
  def index?
    true
  end

  def sync?
    false
  end

  def show?
    record = T.cast(self.record, ObsidianNote)
    !record.hidden?
  end

  def read?
    record = T.cast(self.record, ObsidianNote)
    record.published?
  end

  def edit?
    false
  end

  # == Scopes
  relation_scope do |relation|
    user&.owner? ? relation : relation.where(hidden: false)
  end
end
