# typed: strict
# frozen_string_literal: true

class ObsidianNotePolicy < ApplicationPolicy
  sig { override.returns(T::Boolean) }
  def index?
    true
  end

  sig { returns(T::Boolean) }
  def edit?
    false
  end

  relation_scope { |relation| relation }
end
