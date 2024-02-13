# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateICloudConnection < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :requires_2fa, T::Boolean
    end

    # == Fields
    field :requires_2fa, Boolean, null: false

    # == Arguments
    argument :email, String
    argument :password, String

    # == Resolver
    sig do
      override(allow_incompatible: true)
        .params(email: String, password: String)
        .returns(Payload)
    end
    def resolve(email:, password:)
      authorize!(to: :create?, with: ICloudConnectionPolicy)
      begin
        result = ICloudClient.login(email:, password:)
        Payload.new(requires_2fa: result.requires_2fa)
      rescue ICloudClient::LoginError => error
        raise GraphQL::ExecutionError, "iCloud login failed: #{error}"
      end
    end
  end
end
