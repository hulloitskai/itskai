# typed: strong

module ActionDispatch
  class Request::Session;
    sig { returns(Rack::Session::SessionId)}
    def id; end
  end

  class Routing::RouteSet
    sig { returns(T::Hash[Symbol, T.untyped]) }
    def default_url_options; end
  end

  class Http::Headers
    sig { params(key: String).returns(T.nilable(String)) }
    def [](key); end
  end
end
