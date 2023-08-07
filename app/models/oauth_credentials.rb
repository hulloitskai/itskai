# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: oauth_credentials
#
#  id            :uuid             not null, primary key
#  access_token  :string           not null
#  provider      :string           not null
#  refresh_token :string           not null
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_oauth_credentials_on_provider  (provider) UNIQUE
#  index_oauth_credentials_on_uid       (uid) UNIQUE
#
class OAuthCredentials < ApplicationRecord
  # == Validations
  validates :provider, presence: true, uniqueness: true
  validates :uid, presence: true, uniqueness: true

  # == Finders
  sig { returns(T.nilable(OAuthCredentials)) }
  def self.spotify = find_by(provider: :spotify)

  sig { returns(OAuthCredentials) }
  def self.spotify!
    spotify or
      raise ActiveRecord::RecordNotFound, "Spotify credentials not found"
  end

  sig { returns(T.nilable(OAuthCredentials)) }
  def self.google = find_by(provider: :google)

  sig { returns(OAuthCredentials) }
  def self.google!
    google or
      raise ActiveRecord::RecordNotFound, "Google credentials not found"
  end
end
