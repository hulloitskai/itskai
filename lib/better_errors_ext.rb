# typed: true
# frozen_string_literal: true

require "active_support/core_ext"

suppress(LoadError) do
  require "better_errors"

  # Use VSCode as default editor.
  ENV["BETTER_ERRORS_EDITOR"] = "vscode"

  # Force open links in new tab.
  ENV["BETTER_ERRORS_INSIDE_FRAME"] = "1"

  class BetterErrors::StackFrame
    module Extension
      extend T::Sig
      extend T::Helpers

      requires_ancestor { BetterErrors::StackFrame }

      sig { returns(T::Boolean) }
      def application?
        return false unless super
        root = BetterErrors.application_root
        root.present? &&
          !(filename.start_with?("#{root}/lib") &&
          filename.end_with?("_ext.rb"))
      end
    end

    prepend Extension
  end

  class BetterErrors::Middleware
    extend T::Sig

    private

    sig { params(env: T::Hash[String, T.untyped]).returns(T::Boolean) }
    def text?(env)
      (
        env["HTTP_X_REQUESTED_WITH"] == "XMLHttpRequest" &&
          env["HTTP_X_INERTIA"] != "true"
      ) || env["HTTP_ACCEPT"].to_s.exclude?("html")
    end
  end
end
