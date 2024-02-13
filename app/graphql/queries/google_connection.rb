# typed: strict
# frozen_string_literal: true

module Queries
  class GoogleConnection < BaseQuery
    # == Definition
    type Types::OAuthConnectionType, null: false

    # == Resolver
    sig { returns(OAuthConnection) }
    def resolve = OAuthConnection.google
  end
end
