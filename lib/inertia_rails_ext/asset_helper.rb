# typed: true
# frozen_string_literal: true

module InertiaRails
  module AssetHelper
    extend T::Sig
    extend T::Helpers
    extend ActiveSupport::Concern

    requires_ancestor { ActionView::Base }

    # == Methods
    sig { params(type: Symbol, options: T.untyped).returns(T.nilable(String)) }
    def inertia_assets(type:, **options)
      component = InertiaRails.page&.fetch(:component)
      return unless component.is_a?(String)

      name = component + ".tsx"
      path = File.join(type.to_s.pluralize, name)
      vite_javascript_tag(path, **options)
    end
  end
end
