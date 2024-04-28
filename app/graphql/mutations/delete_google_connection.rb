# typed: strict
# frozen_string_literal: true

module Mutations
  class DeleteGoogleConnection < BaseMutation
    # == Resolver
    sig { returns({}) }
    def resolve
      authorize!(to: :destroy?, with: OAuthConnectionPolicy)
      credentials = OAuthCredentials.google or
        raise GraphQL::ExecutionError, "No existing Google credentials."
      credentials.destroy!
      {}
    end
  end
end
