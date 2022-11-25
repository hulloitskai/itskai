# typed: strong

class FrontMatterParser::Parsed
  sig { returns(String) }
  def content; end

  sig { returns(T::Hash[String, T.untyped]) }
  def front_matter; end
end
