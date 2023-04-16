# typed: true
# frozen_string_literal: true

module InertiaRails
  class Renderer
    module Extension
      extend T::Sig
      extend T::Helpers

      # == Annotations
      requires_ancestor { Renderer }

      # == Initialization
      def initialize(...)
        super
        @query = T.let(@component + "Query", String)
        @props.transform_keys! do |key|
          if key.is_a?(Symbol)
            key.to_s.camelize(:lower).to_sym
          else
            key
          end
        end
        set_data_prop
      end

      private

      # == Helpers
      sig { void }
      def set_data_prop
        return unless @controller.respond_to?(:query?, true)
        return unless @controller.respond_to?(:query!, true)
        return if @props.with_indifferent_access.include?(:data)
        return unless @controller.send(:query?, @query)
        @props[:data] = @controller.send(:query!, @query)
      end
    end

    prepend Extension
  end
end
