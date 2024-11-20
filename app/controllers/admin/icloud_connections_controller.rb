# typed: true
# frozen_string_literal: true

module Admin
  class ICloudConnectionsController < AdminController
    # == Actions
    # POST /admin/icloud_connections
    def create
      credentials_params = params.require(:credentials).permit(
        :email,
        :password,
      )
      credentials = ICloudCredentials.new(credentials_params)
      unless credentials.valid?
        render(
          json: { errors: credentials.form_errors },
          status: :unprocessable_entity,
        ) and return
      end

      result = ICloudctl.login(
        email: credentials.email,
        password: credentials.password,
      )
      flash.notice = if result.requires_2fa
        "Security code is required to complete authentication."
      else
        "Successfully authenticated with iCloud."
      end
      connection = ICloudConnection.new(
        credentials:,
        status: ICloudctl.status,
      )
      render(
        json: {
          connection: ICloudConnectionSerializer.one(connection),
        },
        status: :created,
      )
    rescue ICloudctl::LoginError => error
      with_log_tags do
        logger.error("Failed to authenticate with iCloud: #{error.message}")
      end
      Rails.error.report(error)
      Sentry.capture_exception(error)
      render(json: { error: error.message }, status: :internal_server_error)
    end

    # POST /admin/icloud_connections/verify_security_code
    def verify_security_code
      verification_params = params.require(:verification).permit(:code)
      verification = ICloudSecurityCodeVerification.new(verification_params)
      unless verification.valid?
        render(
          json: { errors: verification.form_errors },
          status: :unprocessable_entity,
        ) and return
      end

      ICloudctl.verify_security_code(verification.code!)
      connection = ICloudConnection.current
      render(json: {
        connection: ICloudConnectionSerializer.one(connection),
      })
    end

    # DELETE /admin/icloud_connections
    def destroy
      ICloudCredentials.current&.destroy!
      render(json: {})
    rescue => error
      with_log_tags do
        logger.error("Failed to remove iCloud credentials: #{error}")
      end
      raise
    end
  end
end
