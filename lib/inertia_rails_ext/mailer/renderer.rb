# typed: true
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  module Mailer
    class Renderer < ::InertiaRails::Renderer
      extend T::Sig

      sig { returns(T::Hash[T.any(Symbol, String), T.untyped]) }
      attr_reader :props

      sig { override.returns(T.untyped) }
      def render = render_ssr
    end
  end
end
