# typed: strict
# frozen_string_literal: true

module Queries
  class Announcement < BaseQuery
    # == Type
    type String, null: true

    # == Resolver
    sig { returns(T.nilable(String)) }
    def resolve
      ::Announcement.current
    end
  end
end
