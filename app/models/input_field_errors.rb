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
    errors = T.let(new, InputFieldErrors)
    model_errors.each do |base_error|
      base_field = base_error.attribute.to_s
      base = base_error.details[:value]
      errors << InputFieldError.from(base_error)
      case base
      when ActiveRecord::Base
        from(base.errors).each do |error|
          errors << error.within(base_field)
        end
      when Enumerable
        base.each_with_index do |model, index|
          next unless model.is_any?(ActiveRecord::Base, ActiveModel::Model)
          model = T.let(model, T.any(ActiveRecord::Base, ActiveModel::Model))
          next if model.valid?
          from(model.errors).each do |error|
            errors << error.within("#{base_field}.#{index}")
          end
        end
      end
    end
    errors
  end
end
