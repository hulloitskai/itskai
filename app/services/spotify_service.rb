# typed: true
# frozen_string_literal: true

class SpotifyService < ApplicationService
  # == Constants: Badwords
  BADWORDS_FILE = Rails.root.join("config/badwords.txt")

  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = [client_id, client_secret].any?(&:nil?) || super
    end

    # == Methods
    sig { returns(T.nilable(String)) }
    def client_id
      setting("CLIENT_ID")
    end

    sig { returns(T.nilable(String)) }
    def client_secret
      setting("CLIENT_SECRET")
    end

    sig { returns(OAuthCredentials) }
    def credentials
      checked { instance.credentials }
    end

    sig { returns(RSpotify::User) }
    def user
      checked { instance.user }
    end

    sig { returns(T.nilable(CurrentlyPlaying)) }
    def retrieve_currently_playing
      instance.retrieve_currently_playing if ready?
    end

    sig do
      params(track_id: String)
        .returns(T.nilable(T::Array[SpotifyService::LyricLine]))
    end
    def retrieve_lyrics(track_id:)
      instance.retrieve_lyrics(track_id:) if ready?
    end
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @credentials = T.let(@credentials, T.nilable(OAuthCredentials))
    @user = T.let(@user, T.nilable(RSpotify::User))
  end

  # == Service
  sig { override.returns(T::Boolean) }
  def ready?
    @user.present? && super
  end

  sig { override.void }
  def start
    super
    Thread.new do
      silence_logger_in_console do
        load_credentials
        authenticate if @credentials.present?
      end
    end
  end

  # == Methods
  sig { returns(OAuthCredentials) }
  def credentials
    @credentials or raise "Not authenticated (missing credentials)"
  end

  sig { returns(RSpotify::User) }
  def user
    @user or raise "Not authenticated (missing user)"
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
          words = normalize_lyric_line_words(line_hash["words"])
          LyricLine.new(
            start_time_milliseconds: line_hash["startTimeMs"].to_i,
            words:,
            explicit: explicit_lyric_line_words?(words),
          )
        end
      end
    end
  end

  private

  # == Helpers: Badwords
  sig { returns(T::Array[String]) }
  def badwords
    @badwords ||= scoped do
      body = File.read(BADWORDS_FILE)
      body.lines.map { |word| word.strip.downcase }
    end
  end

  # == Helpers
  sig { returns(String) }
  def client_id
    self.class.client_id or raise "Client ID not set"
  end

  sig { returns(String) }
  def client_secret
    self.class.client_secret or raise "Client secret not set"
  end

  sig { void }
  def authenticate
    if authenticate_client
      @user = RSpotify::User.new({
        "id" => credentials.uid,
        "credentials" => {
          "token" => credentials.access_token,
          "refresh_token" => credentials.refresh_token,
        },
      })
    end
  end

  sig { returns(T::Boolean) }
  def authenticate_client
    if client_id.present? && client_secret.present?
      RSpotify.authenticate(client_id, client_secret)
      true
    else
      false
    end
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

  sig { void }
  def load_credentials
    @credentials = OAuthCredentials.spotify
  end

  sig { params(words: String).returns(String) }
  def normalize_lyric_line_words(words)
    words = words.strip
    words == "♪" ? "" : words
  end

  sig { params(words: String).returns(T::Boolean) }
  def explicit_lyric_line_words?(words)
    return false if words.blank?
    downcased_words = words.downcase
    badwords.any? do |badword|
      downcased_words.include?(badword)
    end
  end
end
