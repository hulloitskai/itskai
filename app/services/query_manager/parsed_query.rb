# typed: strict
# frozen_string_literal: true

class QueryManager
  class ParsedQuery < T::Struct
    include ParsedDefinition

    # == Properties
    const :definition, GraphQL::Language::Nodes::OperationDefinition
    const :fragment_references, T::Set[String]
    const :filename, String
  end
end
