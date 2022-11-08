# typed: strict
# frozen_string_literal: true

class SpotifyService
  @user = T.let(@user, T.nilable(RSpotify::User))

  class << self
    extend T::Sig

    sig { returns(T.nilable(RSpotify::User)) }
    attr_reader :user

    sig do
      params(client_id: String, client_secret: String, refresh_token: String)
        .void
    end
    def initialize(client_id:, client_secret:, refresh_token:)
      @user =
        RSpotify::User.new(
          {
            "credentials" => {
              "refresh_token" => refresh_token,
            },
            "id" => "steven-xie",
          },
        )
    end

    sig { returns(T.untyped) }
    def currently_playing_track
      user.try! do |user|
        player = T.let(user.player, RSpotify::Player)
        player.currently_playing.tap do |track|
          puts "currently playing! #{track}"
        end
      end
    end
  end
end
