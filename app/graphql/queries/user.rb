# typed: true
# frozen_string_literal: true

module Queries
  class User < BaseQuery
    include AllowsFailedLoads

    # == Type
    type Types::UserType, null: true

    # == Arguments
    argument :id, ID, loads: Types::UserType, as: :user

    # == Resolver
    sig { params(user: T.nilable(::User)).returns(T.nilable(::User)) }
    def resolve(user:)
      if user
        user if allowed_to?(:show?, user)
      end
    end
  end
end
