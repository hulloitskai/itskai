# typed: true
# frozen_string_literal: true

module Users
  # See: https://github.com/heartcombo/devise#omniauth
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    extend T::Sig

    # == Filters
    before_action :authenticate_user!

    # == Actions
    # GET /user/auth/spotify/callback
    def spotify
      authorize!(to: :connect?, with: OAuthConnectionPolicy)
      credentials = OAuthCredentials.find_or_initialize_by(
        auth.slice(:provider).to_h,
      )
      credentials.update!(
        **auth.slice(:uid),
        **auth.fetch(:credentials).slice(:refresh_token),
      )
      scoped do
        credentials => { uid:, refresh_token: }
        logger.info(
          "Authenticated with Spotify (uid: #{uid}, refresh_token: " \
            "#{refresh_token})",
        )
      end
      if is_navigational_format?
        set_flash_message(:notice, :success, kind: "Spotify")
      end
      redirect_to(admin_path)
      response.set_header("Location", response.get_header("Location") + "#")
    end

    # GET /user/auth/google/callback
    def google
      authorize!(to: :connect?, with: OAuthConnectionPolicy)
      credentials = OAuthCredentials.find_or_initialize_by(
        auth.slice(:provider).to_h,
      )
      credentials.update!(
        **auth.slice(:uid),
        **auth.fetch(:credentials).slice(:refresh_token),
      )
      scoped do
        credentials => { uid:, refresh_token: }
        logger.info(
          "Authenticated with Google (uid: #{uid}, refresh_token: " \
            "#{refresh_token})",
        )
      end
      if is_navigational_format?
        set_flash_message(:notice, :success, kind: "Google")
      end
      redirect_to(admin_path)
      # response.set_header("Location", response.get_header("Location") + "#")
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

    private

    # == Helpers
    sig { returns(OmniAuth::AuthHash) }
    def auth
      request.env.fetch("omniauth.auth")
    end
  end
end
