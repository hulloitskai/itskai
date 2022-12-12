# typed: strict
# frozen_string_literal: true

module Mutations
  class ICloudCredentialsVerifySecurityCode < BaseMutation
    class Payload < T::Struct
      const :icloud_credentials, ICloudCredentials
    end

    field :icloud_credentials, Types::ICloudCredentialsType, null: false

    argument :code, String

    sig do
      override(
        allow_incompatible: true,
      ).params(
        code: String,
      ).returns(Payload)
    end
    def resolve(code:)
      credentials = ICloudCredentials.first
      if credentials.nil?
        raise GraphQL::ExecutionError, "Missing iCloud credentials."
      end

      authorize!(credentials, to: :edit?)
      unless ICloud.verify_security_code(code)
        raise GraphQL::ExecutionError, "Invalid security code."
      end

      ObsidianNote.synchronize_all_later
      Payload.new(icloud_credentials: credentials)
    end
  end
end
