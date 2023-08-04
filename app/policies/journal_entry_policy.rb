# typed: true
# frozen_string_literal: true

class JournalEntryPolicy < ApplicationPolicy
  # == Rules
  def index? = false
end
