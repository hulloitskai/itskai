# typed: strict
# frozen_string_literal: true

begin
  require "oj_serializers"
rescue LoadError
  return
end

module Tapioca
  module Dsl
    module Compilers
      class OjSerializers < Compiler
        extend T::Sig

        ConstantType = type_member do
          { fixed: T.class_of(::Oj::Serializer) }
        end

        sig { override.returns(T::Enumerable[Module]) }
        def self.gather_constants
          descendants_of(::Oj::Serializer)
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
          inferred_class_name = inferred_model_class_name
          class_name = constant.try(:_serializer_model_name) ||
            inferred_class_name
          return_type =
            constant.const_defined?(class_name) ? class_name : "T.untyped"
          method_name = constant.try(:_serializer_object_name) ||
            inferred_class_name.underscore
          scope.create_method(method_name, return_type:)
        end

        sig { returns(String) }
        def inferred_model_class_name
          @inferred_model_class_name ||= T.let(
            T.must(constant.name).delete_suffix("Serializer"),
            T.nilable(String),
          )
        end
      end
    end
  end
end
