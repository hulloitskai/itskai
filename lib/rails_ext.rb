# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Rails
  # Add predicates to determine if Rails is running a console or a server.
  module RuntimeContextHelpers
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
  extend RuntimeContextHelpers
end
