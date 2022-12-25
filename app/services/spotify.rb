# typed: strict
# frozen_string_literal: true

class Spotify < ApplicationService
  # == Initialization
  sig { void }
  def initialize
    super
    @user = T.let(@user, T.nilable(RSpotify::User))
    OAuthCredentials.spotify.try! do |credentials|
      credentials = T.let(credentials, OAuthCredentials)
      authenticate!(credentials)
    end
  end

  sig { override.returns(T::Boolean) }
  def ready? = T.cast(super, T::Boolean) && @user.present?

  sig { params(credentials: OAuthCredentials).void }
  def authenticate!(credentials)
    return unless authenticate_client
    credentials => {uid:, refresh_token:}
    @user = RSpotify::User.new({
      "id" => uid,
      "credentials" => { "refresh_token" => refresh_token },
    }).tap do
      RSpotify::User.send(:refresh_token, uid)
    end
  end

  # == Methods
  sig { returns(T.nilable(RSpotify::Track)) }
  def currently_playing
    player = user!.player
    if player.playing?
      # Compensate for weird bugs in the RSpotify library.
      suppress(NoMethodError) { player.currently_playing }
    end
  end

  private

  # == Helpers
  sig { returns(RSpotify::User) }
  def user!
    @user or raise "Not authenticated"
  end

  sig { returns(T.nilable(String)) }
  def client_id = self.class.client_id

  sig { returns(T.nilable(String)) }
  def client_secret = self.class.client_secret

  sig { returns(T::Boolean) }
  def authenticate_client
    if [client_id, client_secret].all?(&:present?)
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

class Spotify
  class << self
    # == Service
    sig { params(credentials: OAuthCredentials).void }
    def authenticate!(credentials)
      instance.authenticate!(credentials)
    end

    sig { override.returns(T::Boolean) }
    def enabled?
      return T.must(@enabled) if defined?(@enabled)
      @enabled = T.let(@enabled, T.nilable(T::Boolean))
      @enabled = scoped do
        enviroment_set = [client_id, client_secret].all?(&:present?)
        T.let(super, T::Boolean) && enviroment_set
      end
    end

    # == Methods
    sig { returns(T.nilable(RSpotify::Track)) }
    def currently_playing = instance.currently_playing

    # == Helpers
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
  end
end
