# typed: strict
# frozen_string_literal: true

class SpotifyService < ApplicationService
  class << self
    # == Lifecycle
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = [client_id, client_secret].any?(&:nil?) || super
    end

    # == Settings
    sig { returns(T.nilable(String)) }
    def client_id
      setting("CLIENT_ID")
    end

    sig { returns(T.nilable(String)) }
    def client_secret
      setting("CLIENT_SECRET")
    end

    # == Methods
    sig { params(credentials: OAuthCredentials).returns(RSpotify::User) }
    def authenticate(credentials)
      instance.authenticate(credentials)
    end

    sig { returns(RSpotify::User) }
    def user
      checked { instance.user }
    end

    sig { returns(T.nilable(CurrentlyPlaying)) }
    def retrieve_currently_playing
      player = user.player
      if player.playing?
        # Suppress sporadic errors caused by weird bugs in the RSpotify library,
        # as well as certain network errors.
        suppress(NoMethodError, RestClient::BadGateway) do
          RSpotify.raw_response = true
          payload = JSON.parse(player.currently_playing)
          if payload["is_playing"]
            CurrentlyPlaying.new(
              track: RSpotify::Track.new(payload["item"]),
              progress_milliseconds: payload["progress_ms"],
            )
          end
        ensure
          RSpotify.raw_response = false
        end
      end
    end

    sig { params(track_id: String).returns(T.nilable(T::Array[LyricLine])) }
    def retrieve_lyrics(track_id:)
      response = HTTParty.get(
        "https://spotify-lyric-api.herokuapp.com",
        query: {
          trackid: track_id,
        },
      )
      body = T.let(response.parsed_response, T::Hash[String, T.untyped])
      error = body.fetch("error", T::Boolean)
      if error
        message = T.let(body.fetch("message"), String)
        if message != "lyrics for this track is not available on spotify!"
          raise message
        end
      else
        sync_type = T.let(body["syncType"], String)
        lines = T.let(body["lines"], T::Array[T::Hash[String, T.untyped]])
        if sync_type == "LINE_SYNCED"
          lines.map do |line_hash|
            words = normalize_words(line_hash["words"])
            LyricLine.new(
              start_time_milliseconds: line_hash["startTimeMs"].to_i,
              words:,
              explicit: explicit_words?(words),
            )
          end
        end
      end
    end

    private

    # == Helpers
    sig { params(words: String).returns(String) }
    def normalize_words(words)
      words = words.strip
      words == "♪" ? "" : words
    end

    sig { returns(T::Array[String]) }
    def badwords
      @badwords = T.let(@badwords, T.nilable(T::Array[String]))
      @badwords ||= scoped do
        body = Rails.root.join("config/#{service_name}/badwords.txt").read
        body.lines.map { |word| word.strip.downcase }
      end
    end

    sig { params(words: String).returns(T::Boolean) }
    def explicit_words?(words)
      if words.present?
        normalized_words = words.downcase
        badwords.any? { |word| normalized_words.include?(word) }
      else
        false
      end
    end
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @credentials = T.let(@credentials, T.nilable(OAuthCredentials))
    @user = T.let(@user, T.nilable(RSpotify::User))
  end

  # == Lifecycle
  sig { override.returns(T::Boolean) }
  def ready?
    @user.present? && super
  end

  sig { override.void }
  def start
    super
    wrapped_thread do
      silence_logger_in_console do
        credentials = saved_credentials or break
        begin
          authenticate(credentials)
        rescue SocketError => error
          if error.message.include?("Failed to open TCP connection")
            tag_logger do
              logger.warn("Failed to authenticate (bad connection); skipping")
            end
            false
          else
            raise
          end
        end
      end
    end
  end

  # == Settings
  sig { returns(String) }
  def client_id
    self.class.client_id or raise "Client ID not set"
  end

  sig { returns(String) }
  def client_secret
    self.class.client_secret or raise "Client secret not set"
  end

  # == Methods
  sig { params(credentials: OAuthCredentials).returns(RSpotify::User) }
  def authenticate(credentials)
    RSpotify.authenticate(client_id, client_secret)
    @user = RSpotify::User.new({
      "id" => credentials.uid,
      "credentials" => {
        "refresh_token" => credentials.refresh_token,
      },
    })
    RSpotify::User.send(:refresh_token, @user.id)
    @user
  end

  sig { returns(RSpotify::User) }
  def user
    @user or raise "Not authenticated (missing user)"
  end

  private

  # == Helpers
  sig { returns(T.nilable(OAuthCredentials)) }
  def saved_credentials
    OAuthCredentials.spotify
  end
end
