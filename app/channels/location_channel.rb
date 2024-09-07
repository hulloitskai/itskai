# typed: true
# frozen_string_literal: true

class LocationChannel < ApplicationCable::Channel
  # == Handlers
  def subscribed
    access = LocationAccess.valid.find_by(token: access_token!) or
      raise "Access token is invalid or expired"
    stream_for(access)
    active_access_ids << access.id
  rescue StandardError => error
    Rails.error.report(error)
    Sentry.capture_exception(error)
    reject_with(error.message)
  end

  def unsubscribed
    active_access_ids.delete(access_token!)
  end

  # == Active accesses
  class_attribute :active_access_ids, default: []

  # == Helpers
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
