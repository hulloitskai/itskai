# typed: true
# frozen_string_literal: true

class CurrentlyPlayingChannel < ApplicationCable::Channel
  def subscribed
    stream_from(channel_name)
  end

  # == Helpers
  sig do
    params(currently_playing: T.nilable(CurrentlyPlaying)).returns(T.untyped)
  end
  def self.broadcast(currently_playing)
    ActionCable.server.broadcast(
      channel_name,
      {
        "currentlyPlaying" =>
          CurrentlyPlayingMetadataSerializer.one_if(currently_playing),
      },
    )
  end
end
