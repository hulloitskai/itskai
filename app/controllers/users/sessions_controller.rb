# typed: true
# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    # == Filters
    before_action :store_redirect_location, only: :new

    # == Actions
    # GET /login
    def new
      render(inertia: "LoginPage", props: { failed: flash.alert.present? })
    end

    private

    # == Filter Handlers
    sig { void }
    def store_redirect_location
      if (url = params[:redirect_url].presence)
        raise "Redirect URL must be a string" unless url.is_a?(String)
        store_location_for(:user, url)
      end
    end
  end
end
