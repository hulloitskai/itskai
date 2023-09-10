# typed: strict
# frozen_string_literal: true

class LyricsClient
  extend T::Sig
  include HTTParty
  include Singleton

  # == Configuration
  headers "Content-Type" => "application/json",
          "User-Agent" =>
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like " \
            "Gecko) Chrome/101.0.4951.41 Safari/537.36",
          "app-platform" => "WebPlayer"

  # == Initialization
  sig { void }
  def initialize
    @access_token = T.let(nil, T.nilable(SpotifyAccessToken))
  end

  # == Methods
  sig { params(track_id: String).returns(T.nilable(Lyrics)) }
  def retrieve_lyrics(track_id)
    token = access_token
    response = self.class.get(
      "https://spclient.wg.spotify.com/color-lyrics/v2/track/#{track_id}" \
        "?format=json&market=from_token",
      headers: {
        "Authorization": "Bearer #{token}",
      },
      cookies:,
    )
    if response.ok?
      body = JSON.parse(response.body)
      lyrics = T.cast(body.fetch("lyrics"), T::Hash[String, T.untyped])
      sync_type = T.let(lyrics.fetch("syncType"), T.nilable(String))
      lines = T.let(lyrics.fetch("lines"), T::Array[T::Hash[String, T.untyped]])
      if sync_type == "LINE_SYNCED"
        lyrics = Lyrics.new
        lines.each do |line|
          words = normalize_words(line.fetch("words"))
          lyrics << LyricLine.new(
            start_time_milliseconds: line.fetch("startTimeMs").to_i,
            words:,
            explicit: explicit_words?(words),
          )
        end
        lyrics
      end
    end
  end

  sig { params(track_id: String).returns(T.nilable(Lyrics)) }
  def self.retrieve_lyrics(track_id)
    instance.retrieve_lyrics(track_id)
  end

  private

  # == Helpers
  sig { returns(String) }
  def access_token
    @access_token = nil if @access_token&.expired?
    @access_token ||= scoped do
      response = self.class.get(
        "https://open.spotify.com/get_access_token?reason=transport&" \
          "productType=web_player",
        cookies:,
      )
      value = response["accessToken"]
      expiration_timestamp = response["accessTokenExpirationTimestampMs"]
      expires_at = Time.zone.at(expiration_timestamp / 1000)
      SpotifyAccessToken.new(value:, expires_at: expires_at)
    end
    @access_token.value
  end

  sig { returns(T::Hash[String, String]) }
  def cookies
    { "sp_dc" => Lyrics.sp_dc! }
  end

  sig { params(words: String).returns(String) }
  def normalize_words(words)
    words = words.strip
    words == "♪" ? "" : words
  end

  sig { params(words: String).returns(T::Boolean) }
  def explicit_words?(words)
    if words.present?
      normalized_words = words.downcase
      Badwords.words.any? { |word| normalized_words.include?(word) }
    else
      false
    end
  end
end
