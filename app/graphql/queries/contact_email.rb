# typed: strict
# frozen_string_literal: true

module Queries
  class ContactEmail < BaseQuery
    extend T::Sig
    extend T::Helpers

    description "Kai's contact email."
    type String, null: false

    sig { returns(String) }
    def resolve
      unless instance_variable_defined?(:@email)
        @email = T.let(
          ENV["OWNER_CONTACT_EMAIL"].presence,
          T.nilable(String),
        )
      end
      @email or raise GraphQL::ExecutionError, "Missing contact email"
    end
  end
end
