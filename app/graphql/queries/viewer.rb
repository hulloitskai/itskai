# typed: true
# frozen_string_literal: true

module Queries
  class Viewer < BaseQuery
    extend T::Sig
    extend T::Helpers

    description "The currently authenticated user."
    type Types::UserType, null: true

    sig { returns(T.nilable(User)) }
    def resolve
      current_user
    end
  end
end
