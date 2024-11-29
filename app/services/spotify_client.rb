# typed: strict
# frozen_string_literal: true

class SpotifyClient < ApplicationService
  include Singleton
  extend T::Sig

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
  end

  # == Attributes
  sig { returns(Faraday::Connection) }
  attr_reader :conn

  # == Methods
  sig { params(track_id: String).returns(T.nilable(T::Array[LyricLine])) }
  def self.retrieve_lyrics(track_id)
    token = access_token
    response = instance.conn.get(
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
          normalized_words = normalize_words(line.fetch("words"))
          sanitized_words = sanitize_words(normalized_words)
          LyricLine.new(
            start_time_ms: line.fetch("startTimeMs").to_i,
            words: sanitized_words,
          )
        end
      end
    elsif response.status == :not_found
      with_log_tags do
        logger.info("No lyrics found for track #{track_id}")
      end
      nil
    else
      with_log_tags do
        logger.error(
          "Failed to retrieve lyrics for track #{track_id}; bad response: " +
            (response.body.presence || "(empty #{response.status} response)"),
        )
      end
      raise "Bad response from Spotify API"
    end
  end

  sig { returns(SpotifyJamSession) }
  def self.retrieve_or_activate_jam_session
    token = access_token
    response = instance.conn.get(
      "https://spclient.wg.spotify.com/social-connect/v2/sessions/current_or_new",
      { "format" => "json", "active" => "true" },
      {
        "Authorization" => "Bearer #{token}",
        "Cookie" => cookie_header,
      },
    )
    if response.success?
      payload = JSON.parse(response.body)
      with_log_tags do
        logger.debug("Retrieved currently active jam session: #{payload}")
      end
      join_url = generate_shareable_jam_session_url(
        payload.fetch("join_session_uri"),
      )
      SpotifyJamSession.new(
        id: payload.fetch("session_id"),
        join_url:,
      )
    else
      with_log_tags do
        logger.error(
          "Failed to retrieve or activate jam session; bad response: " \
            "#{response.body}",
        )
      end
      raise "Bad response from Spotify API"
    end
  end

  private

  # == Helpers
  sig { returns(String) }
  private_class_method def self.access_token
    @access_token = T.let(nil, T.nilable(SpotifyAccessToken))
    @access_token = nil if @access_token&.expired?
    @access_token ||= scoped do
      response = instance.conn.get(
        "https://open.spotify.com/get_access_token",
        { "reason" => "transport", "productType" => "web_player" },
        { "Cookie" => cookie_header },
      )
      body = response.body
      unless response.success? && body.is_a?(Hash)
        raise "Bad response from Spotify API: #{body || "(empty response)"}"
      end

      value = body.fetch("accessToken")
      expiration_timestamp = body.fetch("accessTokenExpirationTimestampMs").to_i
      expires_at = Time.zone.at(expiration_timestamp.to_f / 1000)
      SpotifyAccessToken.new(value:, expires_at: expires_at)
    end
    @access_token.value
  end

  sig { returns(String) }
  private_class_method def self.cookie_header
    cookies = [HTTP::Cookie.new("sp_dc", Spotify.sp_dc)]
    HTTP::Cookie.cookie_value(cookies)
  end

  sig { params(words: String).returns(String) }
  private_class_method def self.normalize_words(words)
    words = words.strip
    words == "♪" ? "" : words
  end

  sig { params(words: String).returns(String) }
  private_class_method def self.sanitize_words(words)
    sanitized_words = words.dup
    Badwords.current.each do |word|
      sanitized_words.gsub!(/#{Regexp.escape(word)}/i, "*" * word.length)
    end
    sanitized_words
  end

  sig { params(spotify_uri: String).returns(String) }
  private_class_method def self.generate_shareable_jam_session_url(spotify_uri)
    token = access_token
    response = instance.conn.post(
      "https://spclient.wg.spotify.com/url-dispenser/v1/generate-url",
      {
        "spotify_uri" => spotify_uri,
        "custom_data": [
          { "key": "ssp", "value": "1" },
          {
            "key": "app_destination",
            "value": "socialsession",
          },
        ],
      },
      {
        "Authorization" => "Bearer #{token}",
        "Cookie" => cookie_header,
      },
    ) do |req|
      req.params["format"] = "json"
    end
    if response.success?
      payload = response.body
      with_log_tags do
        logger.debug("Generated shareable jam session URL: #{payload}")
      end
      response.body.fetch("shareable_url")
    else
      with_log_tags do
        logger.error(
          "Failed to generate shareable jam session URL; bad response: " \
            "#{response.body}",
        )
      end
      raise "Bad response from Spotify API"
    end
  end
end
