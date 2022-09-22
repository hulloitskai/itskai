# typed: ignore
# frozen_string_literal: true

begin
  require "action_text"
rescue LoadError
  return
end

module Tapioca
  module Dsl
    module Compilers
      class ActionText < Compiler
        extend T::Sig

        ConstantType =
          type_member do
            { fixed: T.all(Module, ::ActionText::Attribute::ClassMethods) }
          end

        sig { override.returns(T::Enumerable[Module]) }
        def self.gather_constants
          descendants_of(::ActiveRecord::Base)
            .reject(&:abstract_class?)
            .grep(::ActionText::Attribute::ClassMethods)
        end

        sig { override.void }
        def decorate
          return if constant.rich_text_association_names.empty?

          root.create_path(constant) do |scope|
            constant.rich_text_association_names.each do |association_name|
              generate_method(scope, association_name)
            end
          end
        end

        private

        def generate_method(scope, association_name)
          name = association_name.to_s.delete_prefix("rich_text_")
          scope.create_method(
            association_name,
            return_type: "ActionText::RichText",
          )
          scope.create_method(
            "#{association_name}=",
            parameters: [create_param("value", type: "ActionText::RichText")],
            return_type: "ActionText::RichText",
          )
          scope.create_method(name, return_type: "ActionText::RichText")
          scope.create_method(
            "#{name}=",
            parameters: [create_param("value", type: "T.untyped")],
            return_type: "T.untyped",
          )
        end
      end
    end
  end
end
