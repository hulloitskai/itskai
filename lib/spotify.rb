# typed: strict
# frozen_string_literal: true

require_relative "spotify/railtie"
require_relative "spotify/streamer"

module Spotify
  # == Configuration
  include ActiveSupport::Configurable
  config_accessor :logger

  class << self
    extend T::Sig

    # == Initialization
    sig { params(stream: T::Boolean).void }
    def initialize!(stream: false)
      @user = T.let(@user, T.nilable(RSpotify::User))
      @streamer = T.let(@streamer, T.nilable(Streamer))
      @streamer&.stop
      if authenticate_client
        credentials = OAuthCredentials.spotify
        @user = authenticate_user(credentials) if credentials
        if @user && stream
          @streamer = Streamer.new
          @streamer.start
        end
      end
    end

    # == Methods: User
    sig { returns(T.nilable(RSpotify::User)) }
    attr_reader :user

    # == Methods: Streaming
    sig { returns(T.nilable(Streamer)) }
    attr_reader :streamer

    # == Methods
    sig { returns(T.nilable(RSpotify::Track)) }
    def currently_playing
      user.try! do |user|
        user = T.let(user, RSpotify::User)
        player = user.player
        player.currently_playing if player.playing?
      end
    end

    private

    sig { returns(T::Boolean) }
    def authenticate_client
      client_id = ENV["SPOTIFY_CLIENT_ID"]
      client_secret = ENV["SPOTIFY_CLIENT_SECRET"]
      if [client_id, client_secret].all?(&:present?)
        RSpotify.authenticate(client_id, client_secret)
        true
      else
        false
      end
    end

    sig { params(credentials: OAuthCredentials).returns(RSpotify::User) }
    def authenticate_user(credentials)
      credentials => {uid:, refresh_token:}
      RSpotify::User.new({
        "id" => uid,
        "credentials" => { "refresh_token" => refresh_token },
      }).tap do
        RSpotify::User.send(:refresh_token, uid)
      end
    end
  end

  ActiveSupport.run_load_hooks(:spotify, self)
end
