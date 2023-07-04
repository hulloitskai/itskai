# typed: true
# frozen_string_literal: true

module InertiaRails
  module Mailer
    class Renderer < ::InertiaRails::Renderer
      extend T::Sig

      attr_reader :props

      sig { override.returns(T.untyped) }
      def render = render_ssr
    end
  end
end
