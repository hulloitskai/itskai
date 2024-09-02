# typed: strong

module RSpotify
  class User
    sig { returns(String) }
    def id; end

    sig { returns(RSpotify::Player) }
    def player; end
  end

  class Track
    sig { returns(String) }
    def id; end

    sig { returns(String) }
    def name; end

    sig { returns(T::Hash[String, String]) }
    def external_urls; end

    sig { returns(RSpotify::Album) }
    def album; end

    sig { returns(T::Array[RSpotify::Artist]) }
    def artists; end
  end

  class Album
    sig { returns(String) }
    def id; end

    sig { returns(String) }
    def name; end

    sig { returns(T::Hash[String, String]) }
    def external_urls; end

    sig { returns(T::Array[T::Hash[String, T.untyped]]) }
    def images; end
  end

  class Artist
    sig { returns(String) }
    def id; end

    sig { returns(String) }
    def name; end

    sig { returns(T::Hash[String, String]) }
    def external_urls; end
  end

  sig do
    params(user_id: String, url: String)
      .returns(T.nilable(T::Hash[String, T.untyped]))
  end
  def self.resolve_auth_request(user_id, url); end
end

# class RSpotify::Player
#   sig {returns(RSpotify::Track)}
#   def currently_playing
#   end
# end
