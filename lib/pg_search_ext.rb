# typed: true
# frozen_string_literal: true

module PgSearch
  module Model
    module ClassMethods
      module Patch
        extend T::Sig

        # == Methods
        sig { params(name: Symbol, options: T.untyped).void }
        def pg_search_scope(name, options)
          super
          pg_search_scope_names << name
        end

        sig { returns(T::Array[Symbol]) }
        def pg_search_scope_names
          @pg_search_scope_names ||= T.let([], T.nilable(T::Array[Symbol]))
        end
      end

      prepend Patch
    end
  end
end
