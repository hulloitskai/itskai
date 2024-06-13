# typed: true
# frozen_string_literal: true

class ICloudCredentialsSerializer < ApplicationSerializer
  # == Configuration
  object_as :credentials, model: "ICloudCredentials"

  # == Attributes
  attributes :cookies, :email, :password, :session
end
