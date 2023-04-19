# typed: true
# frozen_string_literal: true

module Users
  # See: https://github.com/heartcombo/devise#omniauth
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    extend T::Sig

    # == Filters
    before_action :authenticate_user!

    def initialize(*args)
      super
      @user = T.let(@user, T.nilable(User))
    end

    # == Actions
    # GET /user/auth/spotify/callback
    def spotify
      auth = T.let(request.env.fetch("omniauth.auth"), OmniAuth::AuthHash)
      auth = T.let(auth.to_hash, T::Hash[String, T.untyped])
      credentials = OAuthCredentials
        .find_or_initialize_by(
          auth.slice("provider", "uid").symbolize_keys,
        )
      credentials.attributes = auth
        .fetch("credentials")
        .slice("token", "refresh_token")
        .symbolize_keys
        .tap do |credentials|
          credentials[:access_token] = credentials.delete(:token)
        end
      credentials.save!
      credentials.tap do |provider|
        provider = T.let(provider, OAuthCredentials)
        provider => { uid:, refresh_token: }
        logger.info(
          "Authenticated with Spotify (uid: #{uid}, refresh_token: " \
            "#{refresh_token})",
        )
      end
      SpotifyService.restart
      set_flash_message(:notice, :success, kind: "Spotify")
      redirect_to(edit_registration_path(current_user)).tap do
        response.set_header(
          "Location",
          response.get_header("Location") + "#",
        )
      end
    end

    # # GET /user/auth/facebook/callback
    # sig { void }
    # def facebook
    #   @user = User.from_omniauth(request.env.fetch("omniauth.auth"))
    #   if is_navigational_format?
    #     set_flash_message(:notice, :success, kind: "Facebook")
    #   end
    #   sign_in_and_redirect(@user, event: :authentication)

    #   # Clear URL fragment set by Facebook.
    #   #
    #   # See: https://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url
    #   response.set_header("Location", response.get_header("Location") + "#")
    # end
  end
end
