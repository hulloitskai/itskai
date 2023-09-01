# typed: strict
# frozen_string_literal: true

module Types
  class InputFieldErrorType < BaseObject
    # == Fields
    field :field, String, null: false
    field :message, String, null: false

    # == Helpers
    sig { override.returns(InputFieldError) }
    def object = super
  end
end
