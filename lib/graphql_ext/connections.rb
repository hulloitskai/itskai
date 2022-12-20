# typed: strict
# frozen_string_literal: true

require "graphql/connections"
require "rails"

module GraphQL::Connections
  module Stable
    extend T::Sig

    # == Plugin
    sig { params(defn: T.untyped, options: T::Hash[Symbol, T.untyped]).void }
    def self.use(defn, options = {})
      schema = T.let(
        defn.is_a?(Class) ? defn : defn.target,
        T.class_of(GraphQL::Schema),
      )
      schema.connections.add(ActiveRecord::Relation, self)
    end
  end
end
