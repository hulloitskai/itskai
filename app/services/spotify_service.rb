# typed: true
# frozen_string_literal: true

class SpotifyService < ApplicationService
  class << self
    # == Methods: Service
    sig { override.returns(T::Boolean) }
    def enabled?
      return !!@enabled if defined?(@enabled)
      @enabled = T.let(@enabled, T.nilable(T::Boolean))
      @enabled = scoped do
        break false unless super
        client_id.present? && client_secret.present?
      end
    end

    # == Methods
    sig { returns(T.nilable(String)) }
    def client_id
      return @client_id if defined?(@client_id)
      @client_id = T.let(@client_id, T.nilable(String))
      @client_id = ENV["SPOTIFY_CLIENT_ID"]
    end

    sig { returns(T.nilable(String)) }
    def client_secret
      return @client_secret if defined?(@client_secret)
      @client_secret = T.let(@client_secret, T.nilable(String))
      @client_secret = ENV["SPOTIFY_CLIENT_SECRET"]
    end

    sig { returns(OAuthCredentials) }
    def credentials = instance.credentials

    sig { returns(RSpotify::User) }
    def user = instance.user

    sig { returns(T.nilable(RSpotify::Track)) }
    def currently_playing = instance.currently_playing
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @credentials = T.let(@credentials, T.nilable(OAuthCredentials))
    @user = T.let(@user, T.nilable(RSpotify::User))
  end

  # == Methods: Service
  sig { override.returns(T::Boolean) }
  def ready?
    return false unless super
    !@user.nil?
  end

  sig { override.void }
  def start
    super
    @credentials = OAuthCredentials.spotify
    authenticate
  end

  # == Methods
  sig { returns(OAuthCredentials) }
  def credentials
    @credentials or raise "Not authenticated (missing credentials)"
  end

  sig { returns(RSpotify::User) }
  def user
    @user or raise "Not authenticated (missing user)"
  end

  sig { returns(T.nilable(RSpotify::Track)) }
  def currently_playing
    player = user.player
    if player.playing?
      # Suppress sporadic errors caused by weird bugs in the RSpotify library,
      # as well as certain network errors.
      suppress(NoMethodError, RestClient::BadGateway) do
        player.currently_playing
      end
    end
  end

  private

  # == Helpers
  sig { returns(String) }
  def client_id
    T.must(self.class.client_id)
  end

  sig { returns(String) }
  def client_secret
    T.must(self.class.client_secret)
  end

  sig { void }
  def authenticate
    return unless authenticate_client
    @user = RSpotify::User.new({
      "id" => credentials.uid,
      "credentials" => credentials
        .slice(:access_token, :refresh_token)
        .tap do |credentials|
          credentials[:token] = credentials.delete(:access_token)
        end
        .stringify_keys,
    })
  end

  sig { returns(T::Boolean) }
  def authenticate_client
    if client_id.present? && client_secret.present?
      RSpotify.authenticate(client_id, client_secret)
      true
    else
      false
    end
  rescue SocketError => error
    if error.message.include?("Failed to open TCP connection")
      tag_logger do
        logger.warn("Failed to authenticate (bad connection); skipping")
      end
      false
    else
      raise
    end
  end
end
