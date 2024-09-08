# typed: true
# frozen_string_literal: true

module Admin
  class ICloudConnectionsController < AdminController
    # == Filters
    before_action :set_credentials, only: :destroy

    # == Actions
    def create
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

    def verify_security_code
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

    def destroy
      credentials = @credentials or raise "Missing credentials"
      credentials.destroy!
      render(json: {})
    rescue => error
      with_log_tags do
        logger.error("Failed to remove iCloud credentials: #{error}")
      end
      Rails.error.report(error)
      Sentry.capture_exception(error)
      render(json: { error: error.message }, status: :internal_server_error)
    end

    private

    # == Helpers
    sig { returns(ActionController::Parameters) }
    def credentials_params
      params.require(:credentials).permit(:email, :password)
    end

    sig { returns(ActionController::Parameters) }
    def verification_params
      params.require(:verification).permit(:code)
    end

    # == Filter handlers
    sig { void }
    def set_credentials
      @credentials = T.let(
        ICloudCredentials.current,
        T.nilable(ICloudCredentials),
      )
    end
  end
end
