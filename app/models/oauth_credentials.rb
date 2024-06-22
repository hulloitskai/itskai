# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
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
# rubocop:enable Layout/LineLength
class OAuthCredentials < ApplicationRecord
  # == Validations
  validates :provider, :uid, presence: true
  validates :refresh_token, presence: true

  # == Finders
  sig { returns(T.nilable(OAuthCredentials)) }
  def self.spotify = find_by(provider: :spotify)

  sig { returns(T::Boolean) }
  def self.spotify? = exists?(provider: :spotify)

  sig { returns(OAuthCredentials) }
  def self.spotify!
    spotify or
      raise ActiveRecord::RecordNotFound, "Spotify credentials not found"
  end

  sig { returns(T.nilable(OAuthCredentials)) }
  def self.google = find_by(provider: :google)

  sig { returns(T::Boolean) }
  def self.google? = exists?(provider: :google)

  sig { returns(OAuthCredentials) }
  def self.google!
    google or
      raise ActiveRecord::RecordNotFound, "Google credentials not found"
  end
end
