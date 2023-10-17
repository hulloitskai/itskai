# typed: strict
# frozen_string_literal: true

class QueryManager
  class ParsedFragment < T::Struct
    include ParsedDefinition

    # == Properties
    const :definition, GraphQL::Language::Nodes::FragmentDefinition
    const :fragment_references, T::Set[String]
    const :filename, String
  end
end
