# typed: true
# frozen_string_literal: true

module Admin
  class OAuthConnectionsController < AdminController
    # == Actions
    # DELETE /admin/oauth_connections/:provider
    def destroy
      credentials = OAuthCredentials.find_by!(provider: params[:provider])
      credentials.destroy!
      render(json: {})
    rescue => error
      with_log_tags do
        logger.error("Failed to destroy OAuth credentials: #{error}")
      end
      raise
    end
  end
end
