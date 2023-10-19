# typed: strict
# frozen_string_literal: true

module Mutations
  class RemoveGoogleCredentials < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      credentials = OAuthCredentials.google
      if credentials.nil?
        raise GraphQL::ExecutionError, "No existing Google credentials."
      end
      credentials.destroy!
      Payload.new
    end
  end
end
