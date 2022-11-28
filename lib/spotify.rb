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

    # == Init
    sig { void }
    def initialize
      if authenticate
        set_credentials
        set_user
        set_streamer
      end
    end

    # == Methods
    sig { returns(T.nilable(Streamer)) }
    attr_reader :streamer

    sig { returns(T.nilable(RSpotify::Track)) }
    def currently_playing
      user.try! do |user|
        user = T.let(user, RSpotify::User)
        player = user.player
        player.currently_playing if player.playing?
      end
    end

    private

    sig { returns(T.nilable(RSpotify::User)) }
    attr_reader :user

    sig { returns(T::Boolean) }
    def authenticate
      client_id = ENV["SPOTIFY_CLIENT_ID"].presence or return false
      client_secret = ENV["SPOTIFY_CLIENT_SECRET"].presence or return false
      RSpotify.authenticate(client_id, client_secret)
      true
    end

    sig { void }
    def set_credentials
      @credentials = T.let(@credentials, T.nilable(OAuthCredentials))
      @credentials = OAuthCredentials.spotify
    end

    sig { void }
    def set_user
      @user = T.let(@user, T.nilable(RSpotify::User))
      if @credentials.present?
        @credentials => {uid:, refresh_token:}
        @user =
          RSpotify::User.new({
            "id" => uid,
            "credentials" => { "refresh_token" => refresh_token },
          }).tap do
            RSpotify::User.send(:refresh_token, uid)
          end
      end
    end

    sig { void }
    def set_streamer
      @streamer = T.let(@streamer, T.nilable(Streamer))
      if @streamer.present?
        @streamer.stop
      end
      @streamer = Streamer.new
    end
  end

  ActiveSupport.run_load_hooks(:spotify, self)
end
