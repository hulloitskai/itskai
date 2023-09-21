# typed: strict
# frozen_string_literal: true

# Add predicates to determine if Rails is running a console or a server.
module Rails
  class << self
    T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
    def server?
      const_defined?(:Server)
    end

    T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
    def console?
      const_defined?(:Console)
    end

    T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
    def test?
      const_defined?(:TestUnitReporter)
    end
  end
end

# Ensure generators defined in 'lib/generators' are prioritized over
# generators in 'lib/rails/generators'.
module Rails::Generators
  class << self
    private

    T::Sig::WithoutRuntime.sig { returns(T::Array[String]) }
    def lookup_paths
      @lookup_paths ||= T.let(
        %w[generators rails/generators],
        T.nilable(T::Array[String]),
      )
    end
  end
end
