# typed: strict
# frozen_string_literal: true

begin
  require "pg_search"
rescue LoadError
  return
end

module Tapioca
  module Dsl
    module Compilers
      class PgSearch < Compiler
        extend T::Sig
        include Helpers::ActiveRecordConstantsHelper

        ConstantType = type_member do
          {
            fixed: T.all(
              T.class_of(::ActiveRecord::Base),
              ::PgSearch::Model::ClassMethods::TrackScopeNames,
            ),
          }
        end

        sig { override.returns(T::Enumerable[Module]) }
        def self.gather_constants
          descendants_of(::ActiveRecord::Base)
            .grep(::PgSearch::Model::ClassMethods)
        end

        sig { override.void }
        def decorate
          method_names = constant.pg_search_scope_names
          return if method_names.empty?

          root.create_path(constant) do |model|
            relations_enabled = compiler_enabled?("ActiveRecordRelations")
            relation_methods_module = model
              .create_module(RelationMethodsModuleName)
            if relations_enabled
              assoc_relation_methods_mod = model
                .create_module(AssociationRelationMethodsModuleName)
            end

            method_names.each do |scope_method|
              generate_scope_method(
                relation_methods_module,
                scope_method.to_s,
                relations_enabled ? RelationClassName : "T.untyped",
              )
              next unless relations_enabled
              generate_scope_method(
                assoc_relation_methods_mod,
                scope_method.to_s,
                AssociationRelationClassName,
              )
            end

            model.create_extend(RelationMethodsModuleName)
          end
        end

        private

        sig do
          params(
            scope: RBI::Scope,
            method: String,
            return_type: String,
          ).void
        end
        def generate_scope_method(scope, method, return_type)
          scope.create_method(
            method,
            parameters: [
              create_rest_param("args", type: "T.untyped"),
              create_kw_rest_param("kwargs", type: "T.untyped"),
            ],
            return_type: return_type,
          )
        end
      end
    end
  end
end
