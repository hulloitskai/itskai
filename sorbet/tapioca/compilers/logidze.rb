# typed: ignore
# frozen_string_literal: true

begin
  require "logidze"
rescue LoadError
  return
end

module Tapioca
  module Dsl
    module Compilers
      class Logidze < Compiler
        extend T::Sig
        include Helpers::ActiveRecordConstantsHelper

        ConstantType = type_member do
          {
            fixed: T.all(
              T.class_of(::ActiveRecord::Base),
              ::Logidze::Model::ClassMethods,
            ),
          }
        end

        sig { override.returns(T::Enumerable[Module]) }
        def self.gather_constants
          descendants_of(::ActiveRecord::Base)
            .grep(::Logidze::Model::ClassMethods)
        end

        sig { override.void }
        def decorate
          root.create_path(constant) do |model|
            model.create_include("Logidze::Model")
            relation_methods_module = model
              .create_module(RelationMethodsModuleName)
            assoc_relation_methods_module = model
              .create_module(AssociationRelationMethodsModuleName)
            generate_relation_methods(
              relation_methods_module,
              RelationClassName,
            )
            generate_relation_methods(
              assoc_relation_methods_module,
              AssociationRelationClassName,
            )
          end
        end

        private

        sig do
          params(scope: RBI::Scope, return_type: String).void
        end
        def generate_relation_methods(scope, return_type)
          scope.create_method(
            "at",
            parameters: [
              create_kw_param(
                "time",
                type: "T.nilable(T.any(Numeric, String, Date, Time))",
              ),
              create_kw_param("version", type: "T.nilable(Integer)"),
            ],
            return_type:,
          )
          scope.create_method(
            "diff_from",
            parameters: [
              create_kw_param(
                "time",
                type: "T.nilable(T.any(Numeric, String, Date, Time))",
              ),
              create_kw_param("version", type: "T.nilable(Integer)"),
            ],
            return_type:,
          )
          scope.create_method("reset_log_data", return_type: "Integer")
        end
      end
    end
  end
end
