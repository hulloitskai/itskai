# typed: strict
# frozen_string_literal: true

return unless defined?(BetterErrors)

# Use VSCode as default editor.
BetterErrors.editor = :vscode

# Force open links in new tab.
ENV["BETTER_ERRORS_INSIDE_FRAME"] = "1"
