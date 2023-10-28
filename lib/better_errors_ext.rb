# typed: strict
# frozen_string_literal: true

begin
  require "better_errors"
rescue LoadError
  return
end

require "sorbet-runtime"

# Use VSCode as default editor.
ENV["BETTER_ERRORS_EDITOR"] = "vscode"

# Force open links in new tab.
ENV["BETTER_ERRORS_INSIDE_FRAME"] = "1"

class BetterErrors::StackFrame
  # Ignore files in lib/ that are not application code.
  module Patch
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { BetterErrors::StackFrame }

    # == Methods
    sig { returns(T::Boolean) }
    def application?
      return false unless super
      root = BetterErrors.application_root
      root.present? &&
        !(filename.start_with?("#{root}/lib") &&
        filename.end_with?("_ext.rb"))
    end
  end
  prepend Patch
end

class BetterErrors::Middleware
  extend T::Sig

  private

  sig { params(env: T::Hash[String, T.untyped]).returns(T::Boolean) }
  def text?(env)
    (env["HTTP_X_REQUESTED_WITH"] == "XMLHttpRequest" &&
      env["HTTP_X_INERTIA"] != "true") ||
      env["HTTP_ACCEPT"].to_s.exclude?("html")
  end
end
