# typed: strict
# frozen_string_literal: true

module Mutations
  class DeleteGoogleConnection < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      authorize!(to: :destroy?, with: OAuthConnectionPolicy)
      credentials = OAuthCredentials.google or
        raise GraphQL::ExecutionError, "No existing Google credentials."
      credentials.destroy!
      Payload.new
    end
  end
end
