# typed: strict
# frozen_string_literal: true

module Mutations
  class ICloudCredentialsUpdate < BaseMutation
    class Payload < T::Struct
      const :icloud_credentials, T.nilable(ICloudCredentials)
      const :errors, T.nilable(ActiveModel::Errors)
    end

    field :errors, [Types::InputFieldErrorType]
    field :icloud_credentials, Types::ICloudCredentialsType

    argument :email, String
    argument :password, String

    sig do
      override(
        allow_incompatible: true,
      ).params(
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(**attributes)
      credentials = ICloudCredentials.first_or_initialize
      authorize!(credentials, to: :edit?)
      if credentials.update(cookies: nil, session: nil, **attributes)
        ICloud.restart
        Payload.new(icloud_credentials: credentials)
      else
        Payload.new(errors: credentials.errors)
      end
    end
  end
end
