# typed: true
# frozen_string_literal: true

module Admin
  class OAuthConnectionsController < AdminController
    # == Filters
    before_action :set_credentials

    # == Actions
    def destroy
      credentials = T.must(@credentials)
      credentials.destroy!
      render(json: {})
    rescue => error
      render(json: { error: error.message })
    end

    private

    # == Filter Handlers
    sig { void }
    def set_credentials
      @credentials = T.let(
        OAuthCredentials.find_by(params.permit(:provider).to_h),
        T.nilable(OAuthCredentials),
      )
    end
  end
end
