# typed: strict
# frozen_string_literal: true

module Mutations
  class RemoveICloudCredentials < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { override.returns(Payload) }
    def resolve
      credentials = ICloudCredentials.first or
        raise GraphQL::ExecutionError, "No existing iCloud credentials."
      credentials = T.let(credentials, ICloudCredentials)
      credentials.destroy!
      ICloudService.restart
      Payload.new
    end
  end
end
