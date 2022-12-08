# typed: true
# frozen_string_literal: true

module FriendlyId
  module Concern
    extend T::Sig
    extend T::Helpers

    requires_ancestor { ApplicationRecord }
    mixes_in_class_methods Base
    mixes_in_class_methods Reserved
    mixes_in_class_methods Slugged

    extend ActiveSupport::Concern

    included do
      # == FriendlyId
      extend FriendlyId unless respond_to?(:friendly)
    end
  end
end
