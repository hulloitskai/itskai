# typed: true
# frozen_string_literal: true

class CurrentlyPlayingMetadataSerializer < ApplicationSerializer
  # == Configuration
  object_as :currently_playing

  # == Attributes
  attributes progress_ms: { type: :number }, timestamp: { type: :string }
  attribute :track_id, type: :string do
    currently_playing.track.id
  end
end
