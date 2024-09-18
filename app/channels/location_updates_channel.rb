# typed: true
# frozen_string_literal: true

class LocationUpdatesChannel < ApplicationCable::Channel
  # == Active accesses
  class_attribute :active_access_ids, default: []

  # == Handlers
  def subscribed
    access = LocationAccess.valid.find_by(token: access_token!) or
      raise "Access token is invalid or expired"
    stream_for(access)
    active_access_ids << access.id
  end

  def unsubscribed
    active_access_ids.delete(access_token!)
  end

  # == Methods
  sig { params(location: LocationLog).void }
  def self.broadcast(location)
    LocationAccess
      .valid
      .where(id: active_access_ids)
      .joins(:grant)
      .select(:id, "location_access_grants.expires_at AS expires_at")
      .find_each do |access|
        broadcast_to(access, {
          location: LocationWithTrailSerializer.one(location),
          access_expires_at: access[:expires_at],
        })
      end
  end

  private

  # == Helpers
  sig { returns(LocationParameters) }
  def location_params
    @location_params ||= LocationParameters.new(params)
  end

  sig { returns(String) }
  def access_token!
    location_params.access_token or raise "Missing access token"
  end
end
