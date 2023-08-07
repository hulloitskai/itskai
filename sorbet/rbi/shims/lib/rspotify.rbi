# typed: strong

class RSpotify::User
  sig { returns(String) }
  def id; end

  sig { returns(RSpotify::Player) }
  def player
  end
end

# class RSpotify::Player
#   sig {returns(RSpotify::Track)}
#   def currently_playing
#   end
# end

class RSpotify::Track
  sig { returns(String) }
  def id; end

  sig { returns(String) }
  def name; end

  sig { returns(T::Hash[String, String]) }
  def external_urls; end

  sig { returns(RSpotify::Album) }
  def album
  end

  sig { returns(T::Array[RSpotify::Artist]) }
  def artists
  end
end

class RSpotify::Album
  sig { returns(String) }
  def id; end

  sig { returns(String) }
  def name; end

  sig { returns(T::Hash[String, String]) }
  def external_urls; end

  sig { returns(T::Array[T::Hash[String, T.untyped]]) }
  def images
  end
end

class RSpotify::Artist
  sig { returns(String) }
  def id; end

  sig { returns(String) }
  def name; end

  sig { returns(T::Hash[String, String]) }
  def external_urls; end
end
