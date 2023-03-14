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
      @email = T.let(@email, T.nilable(String))
      @email ||= ENV.fetch("OWNER_CONTACT_EMAIL")
    end
  end
end
