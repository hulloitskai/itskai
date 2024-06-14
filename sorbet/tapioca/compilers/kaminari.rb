# typed: ignore
# frozen_string_literal: true

begin
  require "kaminari/activerecord"
rescue LoadError
  return
end

module Tapioca
  module Dsl
    module Compilers
      class Kaminari < Compiler
        extend T::Sig
        include Helpers::ActiveRecordConstantsHelper

        ConstantType = type_member do
          { fixed: T.class_of(::ActiveRecord::Base) }
        end

        sig { override.returns(T::Enumerable[Module]) }
        def self.gather_constants
          descendants_of(::ActiveRecord::Base).reject(&:abstract_class?)
        end

        sig { override.void }
        def decorate
          root.create_path(constant) do |model|
            relations_enabled = compiler_enabled?("ActiveRecordRelations")
            relation_methods_module = model
              .create_module(RelationMethodsModuleName)
            if relations_enabled
              assoc_relation_methods_mod = model
                .create_module(AssociationRelationMethodsModuleName)
            end

            generate_page_method(
              relation_methods_module,
              relations_enabled ? RelationClassName : "T.untyped",
            )
            generate_per_method(
              relation_methods_module,
              relations_enabled ? RelationClassName : "T.untyped",
            )
            if relations_enabled
              generate_page_method(
                assoc_relation_methods_mod,
                AssociationRelationClassName,
              )
              generate_per_method(
                assoc_relation_methods_mod,
                AssociationRelationClassName,
              )
            end

            model.create_extend(RelationMethodsModuleName)
          end
        end

        private

        sig { params(mod: RBI::Scope, return_type: String).void }
        def generate_page_method(mod, return_type)
          mod.create_method(
            ::Kaminari.config.page_method_name,
            parameters: [
              create_opt_param(
                "num",
                type: "T.nilable(Integer)",
                default: "nil",
              ),
            ],
            return_type: return_type,
          )
        end

        sig { params(mod: RBI::Scope, return_type: String).void }
        def generate_per_method(mod, return_type)
          mod.create_method(
            "per",
            parameters: [
              create_param("num", type: "T.nilable(Integer)"),
              create_kw_opt_param(
                "max_per_page",
                type: "T.nilable(Integer)",
                default: "nil",
              ),
            ],
            return_type: return_type,
          )
        end
      end
    end
  end
end
