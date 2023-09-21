# typed: true
# frozen_string_literal: true

module Users
  # See: https://github.com/heartcombo/devise#omniauth
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    extend T::Sig

    # == Filters
    before_action :authenticate_user!

    # == Initialization
    def initialize(*args)
      super
      @user = T.let(@user, T.nilable(User))
    end

    # == Actions
    # GET /user/auth/spotify/callback
    def spotify
      credentials = OAuthCredentials.find_or_initialize_by(
        auth.slice(:provider),
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
      set_flash_message(:notice, :success, kind: "Spotify")
      redirect_to(edit_registration_path(current_user))
      response.set_header("Location", response.get_header("Location") + "#")
    end

    # GET /user/auth/google/callback
    def google
      credentials = OAuthCredentials.find_or_initialize_by(
        auth.slice(:provider),
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
      set_flash_message(:notice, :success, kind: "Google")
      redirect_to(edit_registration_path(current_user))
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
    sig { returns(T::Hash[Symbol, T.untyped]) }
    def auth
      @auth ||= T.let(
        request.env.fetch("omniauth.auth").to_hash(symbolize_keys: true),
        T.nilable(T::Hash[Symbol, T.untyped]),
      )
    end
  end
end
