# typed: strict
# frozen_string_literal: true

require "inertia_rails"
require "graphql_ext"

module InertiaRails
  class Renderer
    # Perform relevant GraphQL queries before rendering.
    module Patch
      extend T::Sig
      extend T::Helpers

      # == Annotations
      requires_ancestor { Renderer }

      # == Initialization
      sig { params(args: T.untyped, kwargs: T.untyped).void }
      def initialize(*args, **kwargs)
        super
        @component = T.let(@component, String)
        @controller = T.let(@controller, AbstractController::Base)
        @props = T.let(@props, T::Hash[T.any(Symbol, String), T.untyped])
        @props.transform_keys! do |key|
          key.is_a?(Symbol) ? key.to_s.camelize(:lower) : key
        end
        set_data_prop
        ::InertiaRails.page = page
      end

      private

      # == Helpers
      sig { void }
      def set_data_prop
        query_name = T.let(@component + "Query", String)
        if @controller.respond_to?(:query?, true) &&
            @controller.respond_to?(:query!, true) &&
            @props.with_indifferent_access.exclude?(:data) &&
            @controller.send(:query?, query_name)
          @props[:data] = @controller.send(:query!, query_name)
        end
      end
    end
    prepend Patch
  end
end
