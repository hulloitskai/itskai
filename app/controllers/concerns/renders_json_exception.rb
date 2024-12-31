# typed: true
# frozen_string_literal: true

module RendersJsonException
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  requires_ancestor { ActionController::Base }

  private

  # == Helpers
  sig { params(exception: Exception).returns(String) }
  def format_json_exception(exception)
    case exception
    when ActionPolicy::Unauthorized
      exception.result.message
    else
      exception.message
    end
  end

  # == Rescue handlers
  sig { params(exception: Exception).void }
  def render_json_exception(exception)
    render(
      json: { error: format_json_exception(exception) },
      status: :internal_server_error,
    )
  end
end
