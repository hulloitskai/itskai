# typed: true
# frozen_string_literal: true

class SpotifyJamSessionPolicy < ApplicationPolicy
  # == Rules
  def activate? = true
end
