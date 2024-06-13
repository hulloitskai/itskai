# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"
require_relative "rails_ext/generators"

module Rails
  # Add predicates to determine if Rails is running a console or a server.
  module Patch
    extend T::Sig
    extend T::Helpers

    requires_ancestor { T.class_of(Rails) }

    # == Methods
    sig { returns(T::Boolean) }
    def server?
      const_defined?(:Server)
    end

    sig { returns(T::Boolean) }
    def console?
      const_defined?(:Console)
    end

    sig { returns(T::Boolean) }
    def test?
      const_defined?(:TestUnitReporter)
    end
  end
  extend Patch
end
