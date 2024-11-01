# typed: strict
# frozen_string_literal: true

begin
  require "friendly_id"
rescue LoadError
  return
end

module Tapioca
  module Dsl
    module Compilers
      class FriendlyId < Compiler
        extend T::Sig
        include Helpers::ActiveRecordConstantsHelper

        ConstantType = type_member do
          {
            fixed: T.all(
              T.class_of(::ActiveRecord::Base),
              ::FriendlyId::Base,
            ),
          }
        end

        sig { override.returns(T::Enumerable[Module]) }
        def self.gather_constants
          descendants_of(::ActiveRecord::Base)
            .grep(::FriendlyId::Base)
        end

        sig { override.void }
        def decorate
          root.create_path(constant) do |model|
            relation_methods_module = model
              .create_module(RelationMethodsModuleName)
            assoc_relation_methods_module = model
              .create_module(AssociationRelationMethodsModuleName)
            generate_friendly_method(
              relation_methods_module,
              RelationClassName,
            )
            generate_friendly_method(
              assoc_relation_methods_module,
              AssociationRelationClassName,
            )
          end
        end

        private

        sig do
          params(scope: RBI::Scope, return_type: String).void
        end
        def generate_friendly_method(scope, return_type)
          scope.create_method("friendly", return_type:)
        end
      end
    end
  end
end
