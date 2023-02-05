# typed: true
# frozen_string_literal: true

class ErrorsController < ApplicationController
  # == Actions ==
  # GET /404
  def not_found
    error(
      status: :not_found,
      title: "Page Not Found",
      description: "The page you were looking for doesn't exist!",
    )
  end

  # GET /500
  def internal_server_error
    error(
      status: :internal_server_error,
      title: "Internal Error",
      description:
        "Sorry about this, but something went wrong while processing this " \
        "request! Kai's been notified about it, and he'll check it out soon.",
    )
  end

  # GET /422
  def unprocessable_entity
    error(
      status: :unprocessable_entity,
      title: "Change Rejected",
      description:
        "The change you wanted was rejected. Maybe you tried to change "\
        "something you didn't have access to?",
    )
  end

  # GET /401
  def unauthorized
    error(
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
    ).void
  end
  def error(status:, title:, description:)
    data = query!("ErrorPageQuery")
    code = Rack::Utils.status_code(status)
    render(
      inertia: "ErrorPage",
      props: { data:, title:, description:, code: },
      status:,
    )
  end
end
