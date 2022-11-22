# typed: strong

module Types::BaseInterface
  mixes_in_class_methods ::GraphQL::Schema::Member::BaseDSLMethods
  mixes_in_class_methods ::GraphQL::Schema::Member::HasFields
  mixes_in_class_methods ::GraphQL::Schema::Member::RelayShortcuts
  mixes_in_class_methods ::GraphQL::Schema::Interface::DefinitionMethods
end
