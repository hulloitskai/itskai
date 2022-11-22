# typed: strict
# frozen_string_literal: true

module Mutations
  class ICloudCredentialsUpdate < BaseMutation
    class Payload < T::Struct
      const :icloud_credentials, T.nilable(ICloudCredentials)
      const :errors, T.nilable(ActiveModel::Errors)
    end

    field :errors, [Types::ValidationErrorType]
    field :icloud_credentials, Types::ICloudCredentialsType

    argument :email, String, required: true
    argument :password, String, required: true

    sig { override.params(attributes: T.untyped).returns(Payload) }
    def resolve(**attributes)
      credentials = ICloudCredentials.first_or_initialize
      authorize!(credentials, to: :edit?)
      if credentials.update(cookies: nil, session: nil, **attributes)
        ICloud.authenticate(credentials: credentials)
        Payload.new(icloud_credentials: credentials)
      else
        Payload.new(errors: credentials.errors)
      end
    end
  end
end
