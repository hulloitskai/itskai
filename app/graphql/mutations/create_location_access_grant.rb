# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateLocationAccessGrant < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :grant, LocationAccessGrant
    end

    # == Fields
    field :grant, Types::LocationAccessGrantType

    # == Arguments
    argument :expires_in_seconds, Integer
    argument :recipient, String

    # == Resolver
    sig do
      override.params(
        expires_in_seconds: Integer,
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(expires_in_seconds:, **attributes)
      grant = LocationAccessGrant.create!(
        expires_in: expires_in_seconds.seconds,
        **attributes,
      )
      Payload.new(grant:)
    end
  end
end
