# typed: strict
# frozen_string_literal: true

module Mutations
  class RemoveInstagramCredentials < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      credentials = InstagramCredentials.first or
        raise GraphQL::ExecutionError, "No existing Instagram credentials."
      credentials = T.let(credentials, InstagramCredentials)
      credentials.destroy!
      Payload.new
    end
  end
end
