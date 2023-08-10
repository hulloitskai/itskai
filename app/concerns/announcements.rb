# typed: true
# frozen_string_literal: true

module Announcements
  class << self
    extend T::Sig

    sig { returns(T.nilable(String)) }
    def announcement
      ENV["ANNOUNCEMENT"].presence
    end
  end
end
