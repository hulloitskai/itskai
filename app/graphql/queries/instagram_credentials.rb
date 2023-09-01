# typed: strict
# frozen_string_literal: true

module Queries
  class InstagramCredentials < BaseQuery
    # == Type
    type Types::InstagramCredentialsType, null: true

    # == Resolver
    sig { returns(T.nilable(::InstagramCredentials)) }
    def resolve
      credentials = ::InstagramCredentials.first or return
      credentials = T.let(credentials, ::InstagramCredentials)
      credentials if allowed_to?(:show?, credentials)
    end
  end
end
