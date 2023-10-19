# typed: strict
# frozen_string_literal: true

require "shortcuts"

module Shortcuts
  class ApplicationController < ::ApplicationController
    private

    # == Helpers
    sig { returns(String) }
    def secret_key = Shortcuts.secret_key!

    # == Filter Handlers
    sig { void }
    def verify_secret_key
      if request.headers["Secret-Key"] != secret_key
        render(
          plain: "Not authorized: Invalid secret key",
          status: :unauthorized,
        )
      end
    end
  end
end
