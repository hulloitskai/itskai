# typed: true
# frozen_string_literal: true

class LocationAccessGrantSerializer < ApplicationSerializer
  # == Configuration
  object_as :grant, model: "LocationAccessGrant"

  # == Attributes
  identifier
  attributes :recipient, :password, :created_at, :expires_at
end
