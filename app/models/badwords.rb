# typed: strict
# frozen_string_literal: true

class Badwords
  extend T::Sig
  include Singleton

  # == Constants
  FILE = T.let(Rails.root.join("config/badwords.txt"), Pathname)

  # == Initialization
  sig { void }
  def initialize
    body = FILE.read
    words = body.lines.map { |word| word.strip.downcase }
    @words = T.let(words, T::Array[String])
  end

  # == Current
  sig { returns(Badwords) }
  def self.current = instance

  # == Attributes
  sig { returns(T::Array[String]) }
  attr_reader :words
end
