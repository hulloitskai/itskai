# typed: true
# frozen_string_literal: true

module Badwords
  class << self
    extend T::Sig

    sig { returns(T::Array[String]) }
    def current
      @value = T.let(@badwords, T.nilable(T::Array[String]))
      @value ||= scoped do
        body = Rails.root.join("config/badwords.txt").read
        body.lines.map { |word| word.strip.downcase }
      end
    end
  end
end
