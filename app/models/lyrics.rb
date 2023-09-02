# typed: true
# frozen_string_literal: true

class Lyrics < Array
  extend T::Sig
  extend T::Generic

  # == Annotations
  Elem = type_member { { fixed: LyricLine } }

  # == Methods
  sig { params(track_id: String).returns(T.nilable(Lyrics)) }
  def self.for_track(track_id)
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
        lyrics = new
        lines.each do |line_hash|
          words = normalize_words(line_hash["words"])
          lyrics << LyricLine.new(
            start_time_milliseconds: line_hash["startTimeMs"].to_i,
            words:,
            explicit: explicit_words?(words),
          )
        end
        lyrics
      end
    end
  end

  # == Helpers
  sig { params(words: String).returns(String) }
  private_class_method def self.normalize_words(words)
    words = words.strip
    words == "♪" ? "" : words
  end

  sig { params(words: String).returns(T::Boolean) }
  private_class_method def self.explicit_words?(words)
    if words.present?
      normalized_words = words.downcase
      badwords.any? { |word| normalized_words.include?(word) }
    else
      false
    end
  end

  sig { returns(T::Array[String]) }
  private_class_method def self.badwords
    Badwords.current.words
  end
end
