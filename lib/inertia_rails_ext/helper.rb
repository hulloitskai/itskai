# typed: strict
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails::Helper
  extend T::Sig
  extend T::Helpers

  # == Annotations
  requires_ancestor { Kernel }
  requires_ancestor { ViteRails::TagHelpers }

  sig { params(type: Symbol, options: T.untyped).returns(T.nilable(String)) }
  def inertia_assets(type:, **options)
    component = InertiaRails.page&.fetch(:component)
    return unless component.is_a?(String)
    name = component + ".tsx"
    path = File.join(type.to_s.pluralize, name)
    vite_javascript_tag(path, **options)
  end
end
