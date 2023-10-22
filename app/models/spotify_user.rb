# typed: strict
# frozen_string_literal: true

require "spotify"

class SpotifyUser < RSpotify::User
  extend T::Sig

  # == Current
  sig { returns(T.nilable(SpotifyUser)) }
  def self.current
    if (credentials = OAuthCredentials.spotify)
      from_credentials(credentials)
    end
  end

  # == Builders
  sig { params(credentials: OAuthCredentials).returns(SpotifyUser) }
  def self.from_credentials(credentials)
    @users = T.let(@users, T.nilable(T::Hash[OAuthCredentials, SpotifyUser]))
    @users ||= Hash.new do |hash, credentials|
      RSpotify.authenticate(Spotify.client_id!, Spotify.client_secret!)
      user = new({
        "id" => credentials.uid,
        "credentials" => {
          "refresh_token" => credentials.refresh_token,
        },
      })
      refresh_token(user.id)
      hash[credentials] = user
    end
    @users[credentials]
  end

  # == Methods
  sig { returns(T.nilable(CurrentlyPlaying)) }
  def currently_playing
    endpoint = "me/player/currently-playing"
    result = RSpotify.resolve_auth_request(id, endpoint)
    if result && result["is_playing"]
      track_data = T.cast(result.fetch("item"), T::Hash[String, T.untyped])
      track = RSpotify::Track.new(track_data)
      progress_milliseconds = T.cast(result.fetch("progress_ms"), Integer)
      timestamp = Time.current
      CurrentlyPlaying.new(track:, progress_milliseconds:, timestamp:)
    end
  rescue RestClient::BadGateway
    # Suppress sporadic errors caused by weird bugs in the RSpotify library,
    # as well as certain network errors.
    nil
  end
end
