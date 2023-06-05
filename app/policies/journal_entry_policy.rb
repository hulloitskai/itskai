# typed: true
# frozen_string_literal: true

class JournalEntryPolicy < ApplicationPolicy
  # == Rules
  def import?
    false
  end
end
