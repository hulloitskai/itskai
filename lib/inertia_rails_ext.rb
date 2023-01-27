# typed: true
# frozen_string_literal: true

module InertiaRails
  class Renderer
    module Extension
      extend T::Sig
      extend T::Helpers

      requires_ancestor { Renderer }

      def initialize(...)
        super
        @query = @component + "Query"
        set_data_prop
      end

      private

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
