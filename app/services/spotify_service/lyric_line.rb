# typed: true
# frozen_string_literal: true

class SpotifyService
  class LyricLine < T::Struct
    extend T::Sig

    # == Properties
    const :start_time_milliseconds, Integer
    const :words, String
    const :explicit, T::Boolean, default: false

    sig { returns(T::Boolean) }
    def explicit? = explicit
  end
end
