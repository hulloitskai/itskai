# typed: false
# frozen_string_literal: true

class BetterErrors::StackFrame
  module Extension
    def application?
      return false unless super
      root = BetterErrors.application_root
      root.present? &&
        !(filename.start_with?("#{root}/lib") && filename.end_with?("_ext.rb"))
    end
  end

  prepend Extension
end
