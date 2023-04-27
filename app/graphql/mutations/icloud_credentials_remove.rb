# typed: true
# frozen_string_literal: true

module Mutations
  class ICloudCredentialsRemove < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { override.returns(Payload) }
    def resolve
      credentials = ICloudCredentials.first
      if credentials.nil?
        raise GraphQL::ExecutionError, "No existing ICloud credentials."
      end
      credentials.destroy!
      ICloudService.restart
      Payload.new
    end
  end
end
