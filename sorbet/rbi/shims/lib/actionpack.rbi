# typed: strong

class ActionDispatch::Routing::RouteSet
  sig { returns(T::Hash[Symbol, T.untyped]) }
  def default_url_options; end
end

class ActionDispatch::Http::Headers
  sig { params(key: String).returns(T.nilable(String)) }
  def [](key); end
end
