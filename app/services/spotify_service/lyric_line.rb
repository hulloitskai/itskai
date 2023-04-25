# typed: true
# frozen_string_literal: true

class SpotifyService
  class LyricLine < T::Struct
    const :start_time_milliseconds, Integer
    const :words, String
  end
end
