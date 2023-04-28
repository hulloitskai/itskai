# typed: strict
# frozen_string_literal: true

require "graphql"

class GraphQL::Schema
  class << self
    extend T::Sig

    sig { returns(T.nilable(GraphQL::Queries)) }
    attr_accessor :queries

    sig { returns(GraphQL::Queries) }
    def queries!
      queries or raise "Queries not installed"
    end

    sig { returns(GraphQL::Subscriptions) }
    def subscriptions!
      subscriptions or raise "Subscriptions not installed"
    end
  end
end
