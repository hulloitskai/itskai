# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module Lyrics
  extend T::Sig

  # == Methods
  sig { returns(T.nilable(String)) }
  def self.sp_dc
    ENV["LYRICS_SP_DC"]
  end

  sig { returns(String) }
  def self.sp_dc!
    sp_dc or raise "Lyrics SP DC not set"
  end
end
