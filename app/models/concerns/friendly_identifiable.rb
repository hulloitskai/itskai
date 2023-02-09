# typed: true
# frozen_string_literal: true

module FriendlyIdentifiable
  extend T::Sig
  extend T::Helpers

  # == Modules
  extend ActiveSupport::Concern

  # == Configuration
  requires_ancestor { ApplicationRecord }

  included do
    extend FriendlyId unless respond_to?(:friendly)
  end
end
