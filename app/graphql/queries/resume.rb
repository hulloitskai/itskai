# typed: strict
# frozen_string_literal: true

require "resume"

module Queries
  class Resume < BaseQuery
    # == Type
    type GraphQL::Types::JSON, null: false

    # == Arguments
    argument :variant, String, required: false

    # == Resolver
    sig do
      params(variant: T.nilable(String)).returns(T::Hash[String, T.untyped])
    end
    def resolve(variant: nil)
      ::Resume.current(variant: variant&.to_sym)
    end
  end
end
