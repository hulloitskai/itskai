# typed: true
# frozen_string_literal: true

module InertiaRails
  module AssetHelper
    extend T::Sig
    extend T::Helpers
    extend ActiveSupport::Concern

    requires_ancestor { ActionView::Base }

    # == Methods
    sig do
      params(
        page: T::Hash[Symbol, T.untyped],
        type: Symbol,
        options: T.untyped,
      ).returns(T.nilable(String))
    end
    def inertia_assets(page, type:, **options)
      component = page.fetch(:component)
      unless component.is_a?(String)
        raise "Invalid component: #{component}"
      end

      name = component + ".tsx"
      path = File.join(type.to_s.pluralize, name)
      vite_javascript_tag(path, **options)
    end
  end
end
