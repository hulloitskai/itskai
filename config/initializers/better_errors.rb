# typed: strict
# frozen_string_literal: true

# Use VSCode as default editor.
BetterErrors.editor = :vscode

# Use Pry instead of IRB.
BetterErrors.use_pry!

# Force open links in new tab.
ENV["BETTER_ERRORS_INSIDE_FRAME"] = "1"
