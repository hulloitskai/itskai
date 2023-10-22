# typed: strict
# frozen_string_literal: true

module Types
  class CurrentlyPlayingType < BaseObject
    # == Fields
    field :progress_milliseconds, Integer, null: false
    field :timestamp, DateTimeType, null: false
    field :track, SpotifyTrackType, null: false

    # == Helpers
    sig { override.returns(::CurrentlyPlaying) }
    def object = super
  end
end
