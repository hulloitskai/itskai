# typed: strict
# frozen_string_literal: true

# See: https://github.com/heartcombo/devise#omniauth
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  extend T::Sig

  sig { params(args: T.untyped).void }
  def initialize(*args)
    super
    @user = T.let(@user, T.nilable(User))
  end

  # == Actions ==
  # # GET /account/auth/google/callback
  # sig { void }
  # def google
  #   @user = User.from_omniauth(request.env.fetch("omniauth.auth"))
  #   if is_navigational_format?
  #     set_flash_message(:notice, :success, kind: "Google")
  #   end
  #   sign_in_and_redirect(@user, event: :authentication)
  #   response.set_header("Location", response.get_header("Location") + "#")
  # end

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
