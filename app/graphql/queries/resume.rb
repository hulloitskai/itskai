# typed: true
# frozen_string_literal: true

module Queries
  class Resume < BaseQuery
    # == Type
    type GraphQL::Types::JSON, null: false

    # == Resolver
    sig { returns(T::Hash[String, T.untyped]) }
    def resolve
      ResumeService.load_resume
    end
  end
end
