# typed: ignore
# frozen_string_literal: true

begin
  require "neighbor"
rescue LoadError
  return
end

module Tapioca
  module Dsl
    module Compilers
      class Neighbor < Compiler
        extend T::Sig

        ConstantType =
          type_member do
            {
              fixed: T.all(
                T::Class[T.anything],
                ::ActiveRecord::ModelSchema::ClassMethods,
                ::Neighbor::Model,
              ),
            }
          end

        sig { override.returns(T::Enumerable[Module]) }
        def self.gather_constants
          all_classes.grep(::Neighbor::Model).filter do |klass|
            klass.instance_methods.include?(:nearest_neighbors)
          end
        end

        sig { override.void }
        def decorate
          root.create_path(constant) do |scope|
            generate_instance_methods(scope)
          end
        end

        private

        sig do
          params(scope: RBI::Scope).returns(T.untyped)
        end
        def generate_instance_methods(scope)
          scope.create_method(
            "nearest_neighbors",
            parameters: [
              RBI::TypedParam.new(
                param: RBI::ReqParam.new("attribute_name"),
                type: "T.any(Symbol, String)",
              ),
              RBI::TypedParam.new(
                param:               RBI::KwRestParam.new("options"),
                type: "T.untyped",
              ),
            ],
            return_type: "PrivateRelation",
          )
        end
      end
    end
  end
end
