# typed: strict
# frozen_string_literal: true

require "explorations"

module Queries
  class Explorations < BaseQuery
    # == Type
    type [String], null: false

    # == Resolver
    sig { returns(T::Array[String]) }
    def resolve
      ::Explorations.current
    end
  end
end
