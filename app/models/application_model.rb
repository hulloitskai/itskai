# typed: true
# frozen_string_literal: true

class ApplicationModel
  extend T::Sig
  extend T::Helpers

  # == Modules
  include ActiveModel::Model
  include ActiveModel::Attributes
  include GlobalID::Identification

  # == Methods: Serialization
  sig { overridable.returns(T::Hash[String, T.untyped]) }
  def to_hash = attributes

  sig { returns(T::Hash[String, T.untyped]) }
  def to_h = to_hash

  # == Methods: GraphQL
  sig { returns(InputFieldErrors) }
  def input_field_errors = InputFieldErrors.from(errors)
end
