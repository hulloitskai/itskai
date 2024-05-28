# typed: strict
# frozen_string_literal: true

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
