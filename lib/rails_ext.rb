# typed: false
# frozen_string_literal: true

module Rails
  # Ensure generators defined in 'lib/generators' are prioritized over
  # generators in 'lib/rails/generators'.
  module Generators
    class << self
      private

      def lookup_paths
        @lookup_paths ||= %w[generators rails/generators]
      end
    end
  end
end
