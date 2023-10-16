# typed: true
# frozen_string_literal: true

class ErrorsController < ApplicationController
  # == Actions
  # GET /404
  def not_found
    render_error_page(
      status: :not_found,
      title: "Page Not Found",
      description: "The page you were looking for doesn't exist!",
    )
  end

  # GET /500
  def internal_server_error
    render_error_page(
      status: :internal_server_error,
      title: "Internal Error",
      description:
        "Sorry about this, but something went wrong while processing this " \
        "request! Our team has been notified.",
      error: exception,
    )
  end

  # GET /422
  def unprocessable_entity
    render_error_page(
      status: :unprocessable_entity,
      title: "Change Rejected",
      description:
        "The change you wanted was rejected. Maybe you tried to change " \
        "something you didn't have access to?",
      error: exception,
    )
  end

  # GET /401
  def unauthorized
    render_error_page(
      status: :unauthorized,
      title: "Unauthorized",
      description:
        "You're not allowed to access this resource or perform this action.",
    )
  end

  private

  # == Helpers
  sig do
    params(
      status: Symbol,
      title: String,
      description: String,
      error: T.nilable(Exception),
    ).void
  end
  def render_error_page(status:, title:, description:, error: nil)
    data = query!("ErrorPageQuery")
    code = Rack::Utils.status_code(status)
    if request.format == :html
      render(
        inertia: "ErrorPage",
        props: {
          data:,
          title:,
          description:,
          code:,
          error: error.to_s,
        },
        status:,
      )
    else
      message = Rack::Utils::HTTP_STATUS_CODES[code]
      render(plain: message, status:)
    end
  end

  sig { returns(T.nilable(Exception)) }
  def exception
    request.env["action_dispatch.exception"]
  end
end
