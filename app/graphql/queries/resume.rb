# typed: true
# frozen_string_literal: true

module Queries
  class Resume < BaseQuery
    # == Configuration
    description "Kai's JSON Resume (https://jsonresume.org/)."

    # == Type
    type GraphQL::Types::JSON, null: false

    # == Resolver
    sig { returns(T::Hash[String, T.untyped]) }
    def resolve
      ::Resume.load
    end
  end
end
