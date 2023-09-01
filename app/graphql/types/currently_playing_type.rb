# typed: strict
# frozen_string_literal: true

module Types
  class CurrentlyPlayingType < BaseObject
    # == Fields
    field :progress_milliseconds, Integer, null: false
    field :track, TrackType, null: false

    # == Helpers
    sig { override.returns(::CurrentlyPlaying) }
    def object = super
  end
end
