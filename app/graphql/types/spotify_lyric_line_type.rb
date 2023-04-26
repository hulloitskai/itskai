# typed: true
# frozen_string_literal: true

module Types
  class SpotifyLyricLineType < BaseObject
    # == Fields
    field :is_explicit, Boolean, null: false, method: :explicit?
    field :start_time_milliseconds, Integer, null: false
    field :words, String, null: false
  end
end

# == Sorbet
module Types
  class SpotifyLyricLineType
    # == Annotations
    sig { returns(SpotifyService::LyricLine) }
    def object = super
  end
end
