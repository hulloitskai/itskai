# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"
require "rails"

module Badwords
  extend T::Sig

  # == Constants
  FILE = T.let(Rails.root.join("config/badwords.txt"), Pathname)

  # == Current
  sig { returns(T::Array[String]) }
  def self.current
    modified_time = File.mtime(FILE)
    key = file_key(modified_time)
    Rails.cache.fetch(key) { load_file }
  end

  private

  # == Helpers
  sig { returns(T::Array[String]) }
  private_class_method def self.load_file
    FILE.read.lines.map { |word| word.strip.downcase }
  end

  sig { params(modified_time: Time).returns(T.anything) }
  private_class_method def self.file_key(modified_time)
    [:badwords, :file, modified_time.to_i]
  end
end
