# typed: strict
# frozen_string_literal: true

module Types
  class ValidationErrorType < BaseObject
    field :field, String, null: false
    field :message, String, null: false

    sig { returns(String) }
    def field
      object.attribute.to_s.camelize(:lower)
    end

    sig { returns(String) }
    def message
      object.full_message + "."
    end
  end
end
