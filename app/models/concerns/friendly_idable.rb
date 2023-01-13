# typed: true
# frozen_string_literal: true

module FriendlyIdable
  extend T::Sig
  extend T::Helpers

  requires_ancestor { ApplicationRecord }

  extend ActiveSupport::Concern

  included do
    extend FriendlyId unless respond_to?(:friendly)
  end
end
