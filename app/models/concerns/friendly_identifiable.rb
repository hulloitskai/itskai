# typed: strict
# frozen_string_literal: true

module FriendlyIdentifiable
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  requires_ancestor { ApplicationRecord }

  # == Methods
  included do
    extend FriendlyId unless respond_to?(:friendly)
  end
end
