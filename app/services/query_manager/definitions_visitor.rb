# typed: strict
# frozen_string_literal: true

class QueryManager
  class DefinitionsVisitor < GraphQL::Language::Visitor
    extend T::Sig

    # == Constants
    LanguageNodesDefinition = T.type_alias do
      T.any(
        GraphQL::Language::Nodes::OperationDefinition,
        GraphQL::Language::Nodes::FragmentDefinition,
      )
    end

    # == Initialization
    sig { params(node: GraphQL::Language::Nodes::AbstractNode).void }
    def initialize(node)
      super
      @definitions = T.let([], T::Array[LanguageNodesDefinition])
    end

    # == Attributes
    sig { returns(T::Array[LanguageNodesDefinition]) }
    attr_reader :definitions

    # == Callback Handlers
    sig do
      override.params(
        node: GraphQL::Language::Nodes::OperationDefinition,
        parent: GraphQL::Language::Nodes::AbstractNode,
      ).void
    end
    def on_operation_definition(node, parent)
      @definitions << node
      super
    end

    sig do
      override.params(
        node: GraphQL::Language::Nodes::Field,
        parent: GraphQL::Language::Nodes::AbstractNode,
      ).void
    end
    def on_field(node, parent)
      add_typename_to_selections(node) if node.selections.present?
      super
    end

    sig do
      override.params(
        node: GraphQL::Language::Nodes::FragmentDefinition,
        parent: GraphQL::Language::Nodes::AbstractNode,
      ).void
    end
    def on_fragment_definition(node, parent)
      @definitions << node
      super
    end

    private

    # == Helpers
    sig { params(field: GraphQL::Language::Nodes::Field).void }
    def add_typename_to_selections(field)
      unless field.selections.any? { |field| field.name == "__typename" }
        field.selections << GraphQL::Language::Nodes::Field.new(
          name: "__typename",
        )
      end
    end
  end
end
