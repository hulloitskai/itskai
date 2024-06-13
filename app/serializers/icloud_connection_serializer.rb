# typed: true
# frozen_string_literal: true

class ICloudConnectionSerializer < ApplicationSerializer
  include Devise::Controllers::UrlHelpers
  include Devise::OmniAuth::UrlHelpers

  # == Configuration
  object_as :connection, model: "ICloudConnection"

  # == Attributes
  attributes status: { type: :string }

  # == Associations
  has_one :credentials, serializer: ICloudCredentialsSerializer, optional: true
end
