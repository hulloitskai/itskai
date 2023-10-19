# typed: strict
# frozen_string_literal: true

module Mutations
  class VerifyICloudSecurityCode < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :credentials, ICloudCredentials
    end

    # == Fields
    field :credentials, Types::ICloudCredentialsType, null: false

    # == Arguments
    argument :code, String

    # == Resolver
    sig { params(code: String).returns(Payload) }
    def resolve(code:)
      credentials = ICloudCredentials.first or
        raise GraphQL::ExecutionError, "Missing iCloud credentials."
      credentials = T.let(credentials, ICloudCredentials)
      authorize!(credentials, to: :update?)
      client = ICloudClient.from_credentials(credentials)
      unless client.verify_security_code(code)
        raise GraphQL::ExecutionError, "Invalid security code."
      end
      Payload.new(credentials:)
    end
  end
end
