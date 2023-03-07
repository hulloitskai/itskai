# typed: true
# frozen_string_literal: true

module Types
  class InputFieldErrorType < BaseObject
    # == Fields
    field :field, String, null: false
    field :message, String, null: false
  end
end

# == Sorbet
module Types
  class InputFieldErrorType
    # == Annotations
    sig { override.returns(InputFieldError) }
    def object
      super
    end
  end
end
