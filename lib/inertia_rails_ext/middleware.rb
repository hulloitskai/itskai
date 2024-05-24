# typed: true
# frozen_string_literal: true

module InertiaRails
  class Middleware
    class InertiaRailsRequest
      module Patch
        extend T::Sig

        def initialize(...)
          super
          @env = T.let(@env, T::Hash[String, T.untyped])
        end

        private

        sig { returns(T::Boolean) }
        def capacitor_request?
          @env["HTTP_X_CAPACITOR"].present?
        end

        sig { returns(T::Boolean) }
        def version_stale?
          !!(super && !capacitor_request?)
        end

        sig { void }
        def copy_xsrf_to_csrf!; end
      end

      prepend Patch
    end
  end
end
