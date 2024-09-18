# typed: true
# frozen_string_literal: true

module RendersJsonException
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  requires_ancestor { ActionController::Base }

  private

  # == Rescue handlers
  sig { params(exception: Exception).void }
  def render_json_exception(exception)
    render(
      json: { error: exception.message },
      status: :internal_server_error,
    )
  end
end
