# typed: true
# frozen_string_literal: true

class CurrentlyPlayingChannel < ApplicationCable::Channel
  # == Callbacks
  after_subscribe :broadcast_currently_playing

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

  private

  # == Callback handlers
  sig { void }
  def broadcast_currently_playing
    self.class.broadcast(CurrentlyPlaying.current)
  end
end
