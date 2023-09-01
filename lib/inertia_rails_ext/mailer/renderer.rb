# typed: strict
# frozen_string_literal: true

module InertiaRails
  module Mailer
    class Renderer < ::InertiaRails::Renderer
      extend T::Sig

      sig { params(args: T.untyped, kwargs: T.untyped).void }
      def initialize(*args, **kwargs)
        super
        @props = T.let(@props, T::Hash[T.untyped, T.untyped])
      end

      sig { returns(T::Hash[T.untyped, T.untyped]) }
      attr_reader :props

      sig { override.returns(T.untyped) }
      def render = render_ssr
    end
  end
end
