# typed: true
# frozen_string_literal: true

module Queries
  class AuthenticatedViewer < BaseQuery
    extend T::Sig
    extend T::Helpers

    description "The currently authenticated user."
    type Types::UserType, null: false

    sig { returns(T.nilable(User)) }
    def resolve
      current_user or raise GraphQL::ExecutionError, "Not authenticated."
    end
  end
end
