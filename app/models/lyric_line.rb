# typed: strict
# frozen_string_literal: true

class LyricLine < T::Struct
  extend T::Sig

  # == Properties
  const :start_time_milliseconds, Integer
  const :words, String
end
