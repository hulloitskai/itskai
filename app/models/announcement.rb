# typed: strict
# frozen_string_literal: true

module Announcement
  class << self
    extend T::Sig

    # == Current
    sig { returns(T.nilable(String)) }
    def current
      ENV["ANNOUNCEMENT"].presence
    end
  end
end
