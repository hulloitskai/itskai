# typed: strict
# frozen_string_literal: true

module Discardable
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { ApplicationRecord }

  extend ActiveSupport::Concern

  # == Discard
  include Discard::Model

  included do
    T.bind(self, T.class_of(ApplicationRecord))

    # == Dependencies
    requires_columns :discarded_at
  end
end
