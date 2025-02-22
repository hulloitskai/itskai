# typed: true
# frozen_string_literal: true

class LocationAccessNotificationPayloadSerializer < ApplicationSerializer
  # == Configuration
  object_as :location_access

  # == Attributes
  identifier
  attributes accessor: { type: :string }, password: { type: :string }
end
