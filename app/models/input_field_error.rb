# typed: strict
# frozen_string_literal: true

class InputFieldError < T::Struct
  extend T::Sig

  # == Attributes
  const :field, String
  const :message, String

  # == Initializers
  sig { params(model_error: ActiveModel::Error).returns(InputFieldError) }
  def self.from(model_error)
    new(
      field: model_error.attribute.to_s
        .camelize(:lower)
        .gsub(/\[([0-9]+)\]/, '.\1'),
      message: model_error.full_message,
    )
  end

  # # == Methods
  # sig { params(path: String).returns(InputFieldError) }
  # def within(path)
  #   InputFieldError.new(field: "#{path}.#{field}", message:)
  # end
end
