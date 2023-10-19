# typed: strict
# frozen_string_literal: true

class InputFieldErrors < Array
  extend T::Sig
  extend T::Generic

  # == Annotations
  Elem = type_member { { fixed: InputFieldError } }

  # == Builders
  sig do
    params(model_errors: T::Enumerable[ActiveModel::Error])
      .returns(InputFieldErrors)
  end
  def self.from(model_errors)
    errors = model_errors.map do |model_error|
      InputFieldError.from(model_error)
    end
    new(errors)
  end

  # == Conversions
  sig { returns(T::Hash[String, String]) }
  def to_h
    super { |error| [error.field, error.message] }
  end
end
