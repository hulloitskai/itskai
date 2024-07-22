# typed: true
# frozen_string_literal: true

module RendersJsonError
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  requires_ancestor { ActionController::Base }

  private

  # == Rescue callbacks
  sig { params(error: Exception).void }
  def render_json_error(error)
    render(
      json: { error: error.message },
      status: :internal_server_error,
    )
  end

  # == Filter handlers
  sig { void }
  def store_user_location!
    store_location_for(:user, request.fullpath)
  end
end
