# typed: strict
# frozen_string_literal: true

if defined?(BetterErrors)
  require "better_errors_ext"

  # Force open links in new tab.
  ENV["BETTER_ERRORS_INSIDE_FRAME"] = "1"
end
