# typed: true
# frozen_string_literal: true

class JournalPolicy < ApplicationPolicy
  # == Rules
  def index? = false
end
