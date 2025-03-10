# typed: strict
# frozen_string_literal: true

class SpotifyUser < RSpotify::User
  extend T::Sig
  include Logging

  # == Current
  sig { returns(T.nilable(SpotifyUser)) }
  def self.current
    if (credentials = OAuthCredentials.spotify)
      from_credentials(credentials)
    end
  end

  sig { returns(T::Boolean) }
  def self.current? = OAuthCredentials.spotify?

  # == Builders
  sig { params(credentials: OAuthCredentials).returns(SpotifyUser) }
  def self.from_credentials(credentials)
    @users = T.let(@users, T.nilable(T::Hash[OAuthCredentials, SpotifyUser]))
    @users ||= Hash.new do |hash, credentials|
      RSpotify.authenticate(Spotify.client_id, Spotify.client_secret)
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
    attempts = 0
    result = begin
      attempts += 1
      RSpotify.resolve_auth_request(id, endpoint)
    rescue RestClient::GatewayTimeout => error
      if attempts > 1
        raise
      else
        logger.warn("Gateway timeout: #{error}")
        retry
      end
    end
    return unless result&.fetch("is_playing")

    track_data = result.fetch("item") or return
    track = RSpotify::Track.new(track_data)
    progress_ms = result.fetch("progress_ms")
    timestamp = Time.current
    CurrentlyPlaying.new(track:, progress_ms:, timestamp:)
  rescue RestClient::BadGateway
    # Suppress sporadic errors caused by weird bugs in the RSpotify library,
    # as well as certain network errors.
    nil
  end
end
