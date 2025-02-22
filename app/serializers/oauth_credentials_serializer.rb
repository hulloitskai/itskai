# typed: true
# frozen_string_literal: true

class OAuthCredentialsSerializer < ApplicationSerializer
  # == Configuration
  object_as :credentials, model: "OAuthCredentials"

  # == Attributes
  attributes :provider, :refresh_token, :uid
end
