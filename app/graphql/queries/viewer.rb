# typed: strict
# frozen_string_literal: true

module Queries
  class Viewer < BaseQuery
    # == Definition
    type Types::UserType, null: true

    # == Resolver
    sig { returns(T.nilable(::User)) }
    def resolve = active_user
  end
end
