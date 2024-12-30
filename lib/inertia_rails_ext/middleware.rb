# typed: true
# frozen_string_literal: true

module InertiaRails
  class Middleware
    class InertiaRailsRequest
      module IgnoreXSRFHeader
        def copy_xsrf_to_csrf!; end
      end
      include IgnoreXSRFHeader
    end
  end
end
