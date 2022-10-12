# typed: true
# frozen_string_literal: true

module Queries
  class ContactEmail < BaseQuery
    extend T::Sig
    extend T::Helpers

    type String, null: false

    sig { returns(String) }
    def resolve
      email = ENV["KAI_CONTACT_EMAIL"]
      raise GraphQL::ExecutionError, "missing contact email" if email.blank?
      email
    end
  end
end
