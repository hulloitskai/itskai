# typed: true
# frozen_string_literal: true

class TimelinePhotoPolicy < ApplicationPolicy
  # == Rules
  def index? = false
end
