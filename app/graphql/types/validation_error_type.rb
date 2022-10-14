# typed: strict
# frozen_string_literal: true

module Types
  class ValidationErrorType < Types::BaseObject
    extend T::Sig

    field :field, String
    field :message, String

    sig { returns(String) }
    def field
      object.attribute.camelize
    end

    sig { returns(String) }
    def message
      object.full_message + "."
    end
  end
end
