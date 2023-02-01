# typed: true
# frozen_string_literal: true

module Queries
  class Viewer < BaseQuery
    # == Configuration
    description "The currently authenticated user."

    # == Type
    type Types::UserType, null: true

    # == Resolver
    sig { returns(T.nilable(User)) }
    def resolve
      current_user
    end
  end
end
