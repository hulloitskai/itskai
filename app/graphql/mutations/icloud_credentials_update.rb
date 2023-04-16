# typed: true
# frozen_string_literal: true

module Mutations
  class ICloudCredentialsUpdate < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :icloud_credentials, T.nilable(ICloudCredentials)
      const :errors, T.nilable(ActiveModel::Errors)
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
      credentials = ICloudCredentials.first_or_initialize
      authorize!(credentials, to: :update?)
      if credentials.update(cookies: nil, session: nil, **attributes)
        ICloudService.restart
        Payload.new(icloud_credentials: credentials)
      else
        Payload.new(errors: credentials.errors)
      end
    end
  end
end
