# typed: true
# frozen_string_literal: true

module Queries
  class ContactEmail < BaseQuery
    # == Configuration
    description "Kai's contact email."

    # == Type
    type String, null: false

    # == Resolver
    sig { returns(String) }
    def resolve
      unless instance_variable_defined?(:@email)
        @email = T.let(ENV["OWNER_CONTACT_EMAIL"].presence,
                       T.nilable(String))
      end
      @email or raise GraphQL::ExecutionError, "Missing contact email"
    end
  end
end
