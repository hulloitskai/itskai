# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module Announcement
  extend T::Sig

  # == Current
  sig { returns(T.nilable(String)) }
  def self.current
    ENV["ANNOUNCEMENT"].presence
  end
end
