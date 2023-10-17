# typed: strict
# frozen_string_literal: true

class QueryManager
  class FragmentReferencesVisitor < GraphQL::Language::Visitor
    extend T::Sig

    # == Initialization
    sig { params(node: GraphQL::Language::Nodes::AbstractNode).void }
    def initialize(node)
      super
      @references = T.let(Set.new, T::Set[String])
    end

    # == Attributes
    sig { returns(T::Set[String]) }
    attr_reader :references

    # == Methods
    sig do
      override.params(
        node: GraphQL::Language::Nodes::FragmentSpread,
        parent: GraphQL::Language::Nodes::AbstractNode,
      ).void
    end
    def on_fragment_spread(node, parent)
      @references << node.name
      super
    end
  end
end
