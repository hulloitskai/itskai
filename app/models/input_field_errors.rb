# typed: strict
# frozen_string_literal: true

class InputFieldErrors < Array
  extend T::Sig
  extend T::Generic

  Elem = type_member { { fixed: InputFieldError } }

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
end
