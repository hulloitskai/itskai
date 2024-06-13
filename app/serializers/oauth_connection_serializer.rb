# typed: true
# frozen_string_literal: true

class OAuthConnectionSerializer < ApplicationSerializer
  include Devise::Controllers::UrlHelpers
  include Devise::OmniAuth::UrlHelpers

  # == Configuration
  object_as :connection, model: "OAuthConnection"

  # == Attributes
  attributes provider: { type: :string }, status: { type: :string }
  attribute :authorize_url, type: :string do
    public_send(:"user_#{connection.provider}_omniauth_authorize_path")
  end

  # == Associations
  has_one :credentials, serializer: OAuthCredentialsSerializer, nullable: true
end
