# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateLocationAccessGrant < BaseMutation
    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :grant, Types::LocationAccessGrantType

    # == Arguments
    argument :expires_in_seconds, Integer
    argument :password, String, required: false
    argument :recipient, String

    # == Resolver
    sig do
      params(
        expires_in_seconds: Integer,
        attributes: T.untyped,
      ).returns(T.any(
        { grant: T.nilable(LocationAccessGrant) },
        { errors: T.nilable(InputFieldErrors) },
      ))
    end
    def resolve(expires_in_seconds:, **attributes)
      authorize!(to: :create?, with: LocationAccessGrantPolicy)
      grant = LocationAccessGrant.new(
        expires_in: expires_in_seconds.seconds,
        **attributes,
      )
      if grant.save
        { grant: }
      else
        { errors: grant.input_field_errors }
      end
    end
  end
end
