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
      return @email if defined?(@email)
      @email = ENV["CONTACT_EMAIL"] or
        raise "Missing contact email"
    end
  end
end
