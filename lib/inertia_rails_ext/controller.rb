# typed: strict
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  module Controller
    extend T::Sig
    extend T::Helpers

    requires_ancestor { ActionController::Base }

    sig do
      params(
        options: T.untyped,
        response_options: T::Hash[Symbol, T.untyped],
      ).void
    end
    def redirect_to(options = {}, response_options = {})
      if request.inertia? && response_options.exclude?(:inertia)
        allow_other_host = response_options.delete(:allow_other_host) do
          _allow_other_host
        end
        location = _enforce_open_redirect_protection(
          _compute_redirect_to_location(request, options),
          allow_other_host:,
        )
        inertia_location(location)
      else
        capture_inertia_errors(response_options)
        super(options, response_options)
      end
    end
  end
end
