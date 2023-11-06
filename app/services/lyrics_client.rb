# typed: strict
# frozen_string_literal: true

require "lyrics"
require "badwords"

class LyricsClient < ApplicationService
  include Singleton

  # == Initialization
  sig { void }
  def initialize
    super
    @conn = T.let(
      Faraday.new(
        headers: {
          "User-Agent" =>
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like " \
            "Gecko) Chrome/101.0.4951.41 Safari/537.36",
          "app-platform" => "WebPlayer",
        },
      ) do |conn|
        conn.request(:json)
        conn.response(:json)
        conn.use(:cookie_jar)
      end,
      Faraday::Connection,
    )
    @access_token = T.let(nil, T.nilable(SpotifyAccessToken))
  end

  # == Methods
  sig { params(track_id: String).returns(T.nilable(T::Array[LyricLine])) }
  def retrieve_lyrics(track_id)
    token = access_token
    response = @conn.get(
      "https://spclient.wg.spotify.com/color-lyrics/v2/track/#{track_id}",
      { "format" => "json", "market" => "from_token" },
      {
        "Authorization" => "Bearer #{token}",
        "Cookie" => cookie_header,
      },
    )
    if response.success?
      lyrics = T.cast(response.body.fetch("lyrics"), T::Hash[String, T.untyped])
      sync_type = T.let(lyrics.fetch("syncType"), T.nilable(String))
      lines = T.let(lyrics.fetch("lines"), T::Array[T::Hash[String, T.untyped]])
      if sync_type == "LINE_SYNCED"
        lines.map do |line|
          words = normalize_words(line.fetch("words"))
          LyricLine.new(
            start_time_milliseconds: line.fetch("startTimeMs").to_i,
            words:,
            explicit: explicit_words?(words),
          )
        end
      end
    end
  end

  sig { params(track_id: String).returns(T.nilable(T::Array[LyricLine])) }
  def self.retrieve_lyrics(track_id)
    instance.retrieve_lyrics(track_id)
  end

  private

  # == Helpers
  sig { returns(String) }
  def access_token
    @access_token = nil if @access_token&.expired?
    @access_token ||= scoped do
      response = @conn.get(
        "https://open.spotify.com/get_access_token",
        { "reason" => "transport", "productType" => "web_player" },
        { "Cookie" => cookie_header },
      )
      value = T.cast(response.body.fetch("accessToken"), String)
      expiration_timestamp = T.cast(
        response.body.fetch("accessTokenExpirationTimestampMs").to_i,
        Integer,
      )
      expires_at = Time.zone.at(expiration_timestamp.to_f / 1000)
      SpotifyAccessToken.new(value:, expires_at: expires_at)
    end
    @access_token.value
  end

  sig { returns(String) }
  def cookie_header
    cookies = [HTTP::Cookie.new("sp_dc", Lyrics.sp_dc!)]
    HTTP::Cookie.cookie_value(cookies)
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
      Badwords.current.any? { |word| normalized_words.include?(word) }
    else
      false
    end
  end
end
