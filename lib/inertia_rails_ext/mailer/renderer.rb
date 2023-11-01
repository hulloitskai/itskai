# typed: strict
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  module Mailer
    class Renderer < ::InertiaRails::Renderer
      extend T::Sig

      # == Initialization
      sig { params(args: T.untyped, kwargs: T.untyped).void }
      def initialize(*args, **kwargs)
        super
        @props = T.let(@props, T::Hash[T.any(Symbol, String), T.untyped])
      end

      # == Attributes
      sig { returns(T::Hash[T.any(Symbol, String), T.untyped]) }
      attr_reader :props

      # == Methods
      sig { override.returns(T.untyped) }
      def render = render_ssr
    end
  end
end
