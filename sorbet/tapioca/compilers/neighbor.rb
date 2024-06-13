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

        ConstantType = type_member do
          { fixed: T.class_of(::ActiveRecord::Base) }
        end

        sig { override.returns(T::Enumerable[Module]) }
        def self.gather_constants
          descendants_of(::ActiveRecord::Base).grep(::Neighbor::Model)
            .filter do |klass|
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

        sig { params(scope: RBI::Scope).returns(T.untyped) }
        def generate_instance_methods(scope)
          scope.create_method(
            "nearest_neighbors",
            parameters: [
              create_param("attribute_name", type: "T.any(Symbol, String)"),
              create_rest_param("options", type: "T.untyped"),
            ],
            return_type: "PrivateRelation",
          )
        end
      end
    end
  end
end
