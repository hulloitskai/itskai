# typed: true
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  class Renderer
    module SetPage
      extend T::Sig
      extend T::Helpers

      requires_ancestor { Renderer }

      # == Initialization
      def initialize(...)
        super
        ::InertiaRails.page = page
      end
    end
    prepend SetPage
  end
end
