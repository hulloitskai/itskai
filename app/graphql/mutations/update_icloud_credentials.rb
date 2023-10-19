# typed: strict
# frozen_string_literal: true

module Mutations
  class UpdateICloudCredentials < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :credentials, T.nilable(ICloudCredentials)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :credentials, Types::ICloudCredentialsType
    field :errors, [Types::InputFieldErrorType]

    # == Arguments
    argument :email, String
    argument :password, String

    # == Resolver
    sig { override.params(attributes: T.untyped).returns(Payload) }
    def resolve(**attributes)
      credentials = T.let(
        ICloudCredentials.first_or_initialize,
        ICloudCredentials,
      )
      authorize!(credentials, to: :update?)
      if credentials.update(cookies: nil, session: nil, **attributes)
        Payload.new(credentials:)
      else
        Payload.new(errors: credentials.input_field_errors)
      end
    end
  end
end
