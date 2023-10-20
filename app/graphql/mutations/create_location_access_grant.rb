# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateLocationAccessGrant < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :grant, T.nilable(LocationAccessGrant)
      const :errors, T.nilable(InputFieldErrors)
    end

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
      ).returns(Payload)
    end
    def resolve(expires_in_seconds:, **attributes)
      grant = LocationAccessGrant.new(
        expires_in: expires_in_seconds.seconds,
        **attributes,
      )
      if grant.save
        Payload.new(grant:)
      else
        Payload.new(errors: grant.input_field_errors)
      end
    end
  end
end
