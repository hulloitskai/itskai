# typed: true
# frozen_string_literal: true

class ApproximateLocationUpdatesChannel < ApplicationCable::Channel
  # == Actions
  def subscribed
    stream_from(channel_name)
  end

  # == Helpers
  sig { params(location: LocationLog).void }
  def self.broadcast(location)
    message = {
      location: ApproximateLocationSerializer.one(location),
    }
    ActionCable.server.broadcast(channel_name, message)
  end
end
