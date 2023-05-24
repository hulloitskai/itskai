# typed: true
# frozen_string_literal: true

module Mutations
  class VerifyICloudSecurityCode < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :icloud_credentials, ICloudCredentials
    end

    # == Fields
    field :icloud_credentials, Types::ICloudCredentialsType, null: false

    # == Arguments
    argument :code, String

    # == Resolver
    sig { override.params(code: String).returns(Payload) }
    def resolve(code:)
      credentials = ICloudCredentials.first or
        raise GraphQL::ExecutionError, "Missing iCloud credentials."
      authorize!(credentials, to: :update?)
      unless ICloudService.verify_security_code(code)
        raise GraphQL::ExecutionError, "Invalid security code."
      end
      Payload.new(icloud_credentials: credentials)
    end
  end
end
