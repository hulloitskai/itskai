# typed: strong

module Loofah
  sig do
    params(string_or_io: T.any(String, IO), method: Symbol)
      .returns(HTML::DocumentFragment)
  end
  def self.scrub_fragment(string_or_io, method); end
end
