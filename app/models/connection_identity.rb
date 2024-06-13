# typed: true
# frozen_string_literal: true

class ConnectionIdentity < ApplicationModel
  include GlobalID::Identification

  # == Attributes
  attribute :id, default: -> { SecureRandom.uuid }
end
