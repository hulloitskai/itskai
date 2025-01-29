# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: oauth_credentials
#
#  id            :uuid             not null, primary key
#  provider      :string           not null
#  refresh_token :string           not null
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_oauth_credentials_on_provider_and_uid  (provider,uid) UNIQUE
#
class OAuthCredentialsSerializer < ApplicationSerializer
  # == Configuration
  object_as :credentials, model: "OAuthCredentials"

  # == Attributes
  attributes :provider, :refresh_token, :uid
end
