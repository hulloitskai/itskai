# typed: strict
# frozen_string_literal: true

class ApplicationModel
  extend T::Sig

  include ActiveModel::Model
  include ActiveModel::Attributes

  # == GlobalID
  include GlobalID::Identification

  # == Serialization
  sig { overridable.returns(T::Hash[String, T.untyped]) }
  def to_hash
    attributes
  end

  sig { returns(T::Hash[String, T.untyped]) }
  def to_h
    to_hash
  end

  # == GraphQL
  sig { returns(InputFieldErrors) }
  def input_field_errors
    InputFieldErrors.from(errors)
  end
end
