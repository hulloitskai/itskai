# typed: true
# frozen_string_literal: true

module Mutations
  class UpdateICloudCredentials < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :icloud_credentials, T.nilable(ICloudCredentials)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :icloud_credentials, Types::ICloudCredentialsType

    # == Arguments
    argument :email, String
    argument :password, String

    # == Resolver
    sig { override.params(attributes: T.untyped).returns(Payload) }
    def resolve(**attributes)
      credentials = T.let(ICloudCredentials.first_or_initialize,
                          ICloudCredentials)
      authorize!(credentials, to: :update?)
      if credentials.update(cookies: nil, session: nil, **attributes)
        ICloudService.restart
        Payload.new(icloud_credentials: credentials)
      else
        Payload.new(errors: credentials.input_field_errors)
      end
    end
  end
end
