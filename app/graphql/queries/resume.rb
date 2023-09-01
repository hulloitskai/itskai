# typed: strict
# frozen_string_literal: true

module Queries
  class Resume < BaseQuery
    # == Type
    type GraphQL::Types::JSON, null: false

    # == Resolver
    sig { returns(T::Hash[String, T.untyped]) }
    def resolve
      ::Resume.data
    end
  end
end
