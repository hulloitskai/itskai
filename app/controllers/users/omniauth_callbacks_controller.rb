# typed: strict
# frozen_string_literal: true

# See: https://github.com/heartcombo/devise#omniauth
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  extend T::Sig

  # == Filters
  before_action :authenticate_user!

  sig { params(args: T.untyped).void }
  def initialize(*args)
    super
    @user = T.let(@user, T.nilable(User))
  end

  # == Actions
  # GET /account/auth/spotify/callback
  sig { void }
  def spotify
    auth = T.let(request.env.fetch("omniauth.auth"), OmniAuth::AuthHash)
    credentials = OAuthCredentials.find_or_initialize_by(
      auth.slice("provider", "uid").to_h.symbolize_keys,
    )
    credentials.refresh_token = auth.fetch("credentials").fetch("refresh_token")
    credentials.save!
    credentials
      .tap do |provider|
        provider = T.let(provider, OAuthCredentials)
        provider => { uid:, refresh_token: }
        logger.info(
          "Authenticated with Spotify (uid: #{uid}, refresh_token: " \
            "#{refresh_token})",
        )
      end
    Spotify.initialize!(stream: true)
    if is_navigational_format?
      set_flash_message(:notice, :success, kind: "Spotify")
    end
    redirect_to(edit_registration_path(current_user))
    response.set_header("Location", response.get_header("Location") + "#")
  end

  # # GET /account/auth/facebook/callback
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
