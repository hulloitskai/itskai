# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module Rails
  # Add predicates to determine if Rails is running a console or a server.
  module Patch
    extend T::Sig
    extend T::Helpers

    # == Annotations
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

module Rails::Generators
  # Ensure generators defined in 'lib/generators' are prioritized over
  # generators in 'lib/rails/generators'.
  module Patch
    extend T::Sig

    private

    sig { returns(T::Array[String]) }
    def lookup_paths
      @lookup_paths ||= T.let(
        %w[generators rails/generators],
        T.nilable(T::Array[String]),
      )
    end
  end
  extend Patch
end
