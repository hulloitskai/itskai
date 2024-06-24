# typed: true
# frozen_string_literal: true

module Admin
  class OAuthConnectionsController < AdminController
    # == Filters
    before_action :set_credentials

    # == Actions
    def destroy
      raise "Missing credentials" unless @credentials
      @credentials.destroy!
      render(json: {})
    rescue => error
      with_log_tags do
        logger.error("Failed to destroy OAuth credentials: #{error}")
      end
      Rails.error.report(error)
      Sentry.capture_exception(error)
      render(json: { error: error.message })
    end

    private

    # == Filter handlers
    sig { void }
    def set_credentials
      @credentials = T.let(
        OAuthCredentials.find_by(params.permit(:provider).to_h),
        T.nilable(OAuthCredentials),
      )
    end
  end
end
