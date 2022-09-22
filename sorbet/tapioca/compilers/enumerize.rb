# typed: ignore
# frozen_string_literal: true

begin
  require "enumerize"
rescue LoadError
  return
end

module Tapioca
  module Dsl
    module Compilers
      class Enumerize < Compiler
        extend T::Sig

        ConstantType =
          type_member do
            { fixed: T.all(Class, ::Enumerize::Base::ClassMethods) }
          end

        sig { override.returns(T::Enumerable[Module]) }
        def self.gather_constants
          all_classes.grep(::Enumerize::Base::ClassMethods)
        end

        sig { override.void }
        def decorate
          return if constant.enumerized_attributes.empty?
          root.create_path(constant) do |scope|
            attributes = constant.enumerized_attributes.attributes
            generate_class_methods(scope, attributes)
            generate_instance_methods(scope, attributes)
            # attribute_methods.each do |method, attribute_type|
            #   generate_method(klass, method, attribute_type)
            # end
          end
        end

        private

        def generate_class_methods(scope, attributes)
          attributes.keys.each do |name|
            scope.create_method(
              name,
              return_type: "Enumerize::Attribute",
              class_method: true,
            )
          end
        end

        def generate_instance_methods(scope, attributes)
          attributes.each do |name, attribute|
            multiple = attribute.is_a?(::Enumerize::Multiple)
            scope.create_method(
              name,
              return_type: multiple ? "Enumerize::Set" : "Enumerize::Value",
            )
          end
        end
      end
    end
  end
end
