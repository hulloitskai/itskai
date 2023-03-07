# typed: true
# frozen_string_literal: true

module Discardable
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern
  include Discard::Model

  # == Annotations
  abstract!
  requires_ancestor { ApplicationRecord }

  included do
    T.bind(self, T.class_of(ApplicationRecord))

    # == Dependencies
    requires_columns :discarded_at
  end
end
