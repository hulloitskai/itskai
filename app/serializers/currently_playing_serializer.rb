# typed: true
# frozen_string_literal: true

class CurrentlyPlayingSerializer < ApplicationSerializer
  # == Associations
  has_one :track, serializer: RSpotify::TrackSerializer
end
