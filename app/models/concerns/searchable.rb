# typed: strict
# frozen_string_literal: true

module Searchable
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern
  include PgSearch::Model

  # == Annotations
  requires_ancestor { ApplicationRecord }
  mixes_in_class_methods PgSearch::Model::ClassMethods
end
