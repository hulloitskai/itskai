# typed: true
# frozen_string_literal: true

module InertiaRails
  class Middleware
    class InertiaRailsRequest
      module IgnoreXSRFHeader
        def copy_xsrf_to_csrf!; end
      end
      include IgnoreXSRFHeader

      module CapacitorSupport
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
      end
      prepend CapacitorSupport
    end
  end
end
