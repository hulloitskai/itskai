# typed: true
# frozen_string_literal: true

class RelaxedPolicy < ApplicationPolicy
  # == Rules
  def index? = true
  def show? = true
end
