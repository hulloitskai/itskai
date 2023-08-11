# typed: strict
# frozen_string_literal: true

class ApplicationModel
  extend T::Sig
  extend T::Helpers
  extend Enumerize
  include StoreModel::Model

  class << self
    extend T::Sig
    extend T::Helpers
  end

  # == Conversions
  sig { overridable.returns(T::Hash[T.any(Symbol, String), T.untyped]) }
  def to_hash
    attributes.with_indifferent_access
  end

  sig { returns(T::Hash[T.any(Symbol, String), T.untyped]) }
  def to_h = to_hash

  # == Pattern Matching
  sig do
    params(keys: T.nilable(T::Array[Symbol]))
      .returns(T::Hash[Symbol, T.untyped])
  end
  def deconstruct_keys(keys)
    attributes.symbolize_keys.slice(*keys)
  end

  # == GraphQL
  sig { returns(InputFieldErrors) }
  def input_field_errors = InputFieldErrors.from(errors)
end
