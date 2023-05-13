# typed: true
# frozen_string_literal: true

class InputFieldErrors < Array
  extend T::Sig
  extend T::Generic

  # == Annotations
  Elem = type_member { { fixed: InputFieldError } }

  # == Initializers
  sig do
    params(
      model_errors: ActiveModel::Errors,
    ).returns(InputFieldErrors)
  end
  def self.from(model_errors)
    errors = model_errors.map do |model_error|
      InputFieldError.from(model_error)
    end
    new(errors)
  end

  # == Methods
  sig { returns(T::Hash[String, String]) }
  def to_h
    super do |error|
      error = T.let(error, InputFieldError)
      [error.field, error.message]
    end
  end
end
