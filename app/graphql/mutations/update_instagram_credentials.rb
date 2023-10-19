# typed: strict
# frozen_string_literal: true

module Mutations
  class UpdateInstagramCredentials < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :credentials, T.nilable(InstagramCredentials)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :credentials, Types::InstagramCredentialsType
    field :errors, [Types::InputFieldErrorType]

    # == Arguments
    argument :password, String
    argument :security_code, String
    argument :username, String

    # == Resolver
    sig do
      override
        .params(security_code: T.nilable(String), attributes: T.untyped)
        .returns(Payload)
    end
    def resolve(security_code: nil, **attributes)
      credentials = T.let(
        InstagramCredentials.first_or_initialize,
        InstagramCredentials,
      )
      authorize!(credentials, to: :update?)
      if credentials.update(session: nil, **attributes)
        InstagramClient.from_credentials(credentials, security_code:)
        Payload.new(credentials:)
      else
        Payload.new(errors: credentials.input_field_errors)
      end
    end
  end
end
