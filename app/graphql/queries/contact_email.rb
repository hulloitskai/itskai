# typed: strict
# frozen_string_literal: true

require "contact"

module Queries
  class ContactEmail < BaseQuery
    # == Type
    type String, null: false

    # == Resolver
    sig { returns(String) }
    def resolve
      Contact.email or raise GraphQL::ExecutionError, "Contact email not set."
    end
  end
end
