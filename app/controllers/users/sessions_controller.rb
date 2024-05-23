# typed: true
# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    # == Actions
    # GET /login
    def new
      if (url = params[:redirect_url].presence) && url.is_a?(String)
        store_location_for(:user, url)
      end
      render(inertia: "LoginPage", props: { failed: flash.alert.present? })
    end
  end
end
