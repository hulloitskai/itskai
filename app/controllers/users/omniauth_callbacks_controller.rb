# typed: true
# frozen_string_literal: true

module Users
  # See: https://github.com/heartcombo/devise#omniauth
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    extend T::Sig

    # == Filters
    before_action :authenticate_user!

    # GET /auth/google/callback
    # def google
    #   authorize!(with: AdminPolicy)
    #   credentials = OAuthCredentials.find_or_initialize_by(
    #     auth.slice(:provider).to_h,
    #   )
    #   credentials.update!(
    #     **auth.slice(:uid),
    #     **auth.fetch(:credentials).slice(:refresh_token),
    #   )
    #   scoped do
    #     credentials => { uid:, refresh_token: }
    #     logger.info(
    #       "Authenticated with Google (uid: #{uid}, refresh_token: " \
    #         "#{refresh_token})",
    #     )
    #   end
    #   if is_navigational_format?
    #     set_flash_message(:notice, :success, kind: "Google")
    #   end
    #   redirect_to(admin_path)
    #   # response.set_header("Location", response.get_header("Location") + "#")
    # end

    private

    # == Helpers
    sig { returns(OmniAuth::AuthHash) }
    def auth
      request.env.fetch("omniauth.auth")
    end
  end
end
