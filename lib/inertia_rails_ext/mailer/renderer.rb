# typed: true
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  module Mailer
    class Renderer < ::InertiaRails::Renderer
      extend T::Sig

      # == Initialization
      def initialize(...)
        super
        @props = T.let(@props, T::Hash[T.any(Symbol, String), T.untyped])
      end

      # == Methods
      sig { override.returns(T.untyped) }
      def render = render_ssr

      sig { returns(T::Hash[Symbol, T.untyped]) }
      def computed_props
        @props.deep_symbolize_keys
      end
    end
  end
end
