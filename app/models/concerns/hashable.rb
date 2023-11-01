# typed: strict
# frozen_string_literal: true

module Hashable
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  abstract!
  requires_ancestor { ActiveRecord::Base }

  # == Methods
  sig { overridable.returns(T::Hash[T.any(Symbol, String), T.untyped]) }
  def to_hash = build_hash

  sig { returns(T::Hash[T.any(Symbol, String), T.untyped]) }
  def to_h = to_hash

  # == Helpers
  sig do
    params(options: T.untyped)
      .returns(T::Hash[T.any(Symbol, String), T.untyped])
  end
  def build_hash(**options)
    klass = T.cast(self.class, T.class_of(ActiveRecord::Base))
    default_options = { except: klass.filter_attributes }
    options = default_options.deep_merge(options)
    hash = serializable_hash(options).with_indifferent_access
    hash.deep_merge!(hash) if hash.present?
    hash.compact_blank!
    hash
  end
end
