# typed: strict
# frozen_string_literal: true

require "graphql"
require "graphql/connections"

module GraphQL::Connections
  module Stable
    extend T::Sig

    # == Methods
    sig { params(defn: T.untyped, options: T::Hash[Symbol, T.untyped]).void }
    def self.use(defn, options = {})
      schema = T.let(
        defn.is_a?(Class) ? defn : defn.target,
        T.class_of(GraphQL::Schema),
      )
      schema.connections.add(ActiveRecord::Relation, self)
    end
  end

  module PrimaryKey
    class Base
      # Fix `has_next_page'.
      module Patch
        extend T::Sig
        extend T::Helpers

        # == Annotations
        requires_ancestor { Base }

        # == Methods
        sig { returns(T::Boolean) }
        def has_next_page
          if first
            nodes.any? && items_exist?(
              type: :query,
              search: nodes.last[primary_key],
              page_type: :next,
            )
          elsif before
            items_exist?(
              type: :cursor,
              search: before_cursor,
              page_type: :next,
            )
          else
            false
          end
        end
      end
      prepend Patch
    end
  end
end
