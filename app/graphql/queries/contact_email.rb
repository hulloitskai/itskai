# typed: true
# frozen_string_literal: true

module Queries
  class ContactEmail < BaseQuery
    extend T::Sig
    extend T::Helpers

    description "Kai's contact email."
    type String, null: false

    sig { returns(String) }
    def resolve
      unless defined?(@email)
        @email = T.let(@email, T.nilable(String))
        @email = ENV["OWNER_CONTACT_EMAIL"].presence
      end
      @email or raise GraphQL::ExecutionError, "Missing contact email"
    end
  end
end
