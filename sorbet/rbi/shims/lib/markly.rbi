# typed: strong

module Markly
  class << self
    sig do
      params(
        text: String,
        flags: T.any(Symbol, T::Array[Symbol]),
        extensions: T::Array[Symbol],
      )
        .returns(Node)
    end
    def parse(text, flags: T.unsafe(nil), extensions: T.unsafe(nil)); end
  end
end
