# typed: strict
# frozen_string_literal: true

module RemovesBlank
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  requires_ancestor { ActiveRecord::Base }

  class_methods do
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { T.class_of(ActiveRecord::Base) }

    # == Helpers
    sig { params(attributes: T.any(Symbol, String)).void }
    def removes_blank(*attributes)
      normalizes(*T.unsafe(attributes), with: ->(value) { value.presence })
    end
  end
end
