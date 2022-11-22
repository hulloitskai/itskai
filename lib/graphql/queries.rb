# typed: strict
# frozen_string_literal: true

class GraphQL::Queries
  extend T::Sig

  # == Plugin ==
  sig { params(defn: T.untyped, options: T::Hash[Symbol, T.untyped]).void }
  def self.use(defn, options = {})
    schema =
      T.let(defn.is_a?(Class) ? defn : defn.target, T.class_of(GraphQL::Schema))
    schema.queries = new
  end

  sig { void }
  def initialize
    @queries = T.let({}, T::Hash[String, ParsedQuery])
    @fragments = T.let({}, T::Hash[String, ParsedFragment])
  end

  # == Methods ==
  sig { params(name: String, kwargs: T.untyped).returns(Result) }
  def execute(name, **kwargs)
    document = build_query_document(name)
    result = Schema.execute(document: document, **kwargs)
    data, errors = result["data"], result["errors"]
    Result.new(data: data, errors: errors)
  end

  sig { void }
  def load
    @queries.clear
    @fragments.clear
    filenames = Dir.glob(Rails.root.join("app/queries/**/*.graphql").to_s)
    load_files(*T.unsafe(filenames))
  end

  sig { void }
  def listen
    require "listen"
    @listener = T.let(@listener, T.nilable(Listen::Listener))
    @listener =
      Listen.to(
        Rails.root.join("app/queries"),
        only: /\.graphql$/,
      ) do |modified, added, removed|
        reload(modified: modified, removed: removed, added: added)
      end
    @listener.start
    at_exit { @listener&.stop }
  end

  private

  sig do
    params(
      modified: T::Array[String],
      added: T::Array[String],
      removed: T::Array[String],
    ).void
  end
  def reload(modified:, added:, removed:)
    next_files = (modified + added).to_set
    prev_files = (modified + removed).to_set
    [@queries, @fragments].each do |collection|
      collection.reject! { |_, definition| definition.filename.in?(prev_files) }
    end
    load_files(*T.unsafe(next_files))
  end

  sig { params(filenames: String).void }
  def load_files(*filenames)
    filenames.each do |filename|
      document = GraphQL.parse_file(filename)
      definitions = resolve_document_definitions(document)
      definitions.each do |definition|
        fragment_references = resolve_fragment_references(definition)
        case definition
        when GraphQL::Language::Nodes::OperationDefinition
          @queries[definition.name] =
            ParsedQuery.new(
              definition: definition,
              fragment_references: fragment_references,
              filename: filename,
            )
        when GraphQL::Language::Nodes::FragmentDefinition
          @fragments[definition.name] =
            ParsedFragment.new(
              definition: definition,
              fragment_references: fragment_references,
              filename: filename,
            )
        else
          T.absurd(definition)
        end
      end
    end
  end

  sig { params(name: String).returns(ParsedQuery) }
  def query!(name)
    @queries.fetch(name) { raise "Missing query '#{name}'" }
  end

  sig { params(name: String).returns(ParsedFragment) }
  def fragment!(name)
    @fragments.fetch(name) { raise "Missing fragment '#{name}'" }
  end

  sig { params(name: String).returns(GraphQL::Language::Nodes::Document) }
  def build_query_document(name)
    query = query!(name)
    fragment_references = build_fragment_references(query)
    GraphQL::Language::Nodes::Document.new(
      definitions: [
        query.definition,
        *fragment_references.map do |reference|
          fragment!(reference).definition
        end,
      ],
    )
  end

  sig { params(definition: ParsedDefinition).returns(T::Set[String]) }
  def build_fragment_references(definition)
    references = definition.fragment_references.dup
    definition.fragment_references.each do |reference|
      fragment = fragment!(reference)
      references.merge(build_fragment_references(fragment))
    end
    references
  end

  sig do
    params(document: GraphQL::Language::Nodes::Document)
      .returns(
        T::Array[
          T.any(
            GraphQL::Language::Nodes::OperationDefinition,
            GraphQL::Language::Nodes::FragmentDefinition,
          )
        ],
      )
  end
  def resolve_document_definitions(document)
    visitor = DefinitionsVisitor.new(document)
    visitor.visit
    visitor.definitions
  end

  sig do
    params(node: GraphQL::Language::Nodes::AbstractNode).returns(T::Set[String])
  end
  def resolve_fragment_references(node)
    visitor = FragmentReferencesVisitor.new(node)
    visitor.visit
    visitor.references
  end
end

class GraphQL::Queries::Result < T::Struct
  JSONObject = T.type_alias { T::Hash[String, T.untyped] }

  const :data, T.nilable(JSONObject)
  const :errors, T.nilable(T::Array[JSONObject])
end

class GraphQL::Queries::DefinitionsVisitor < GraphQL::Language::Visitor
  extend T::Sig

  Nodes = GraphQL::Language::Nodes
  Definition =
    T.type_alias do
      T.any(Nodes::OperationDefinition, Nodes::FragmentDefinition)
    end

  sig { params(node: GraphQL::Language::Nodes::AbstractNode).void }
  def initialize(node)
    super
    @definitions = T.let([], T::Array[Definition])
  end

  sig { returns(T::Array[Definition]) }
  attr_reader :definitions

  sig do
    override.params(
      node: Nodes::OperationDefinition,
      parent: Nodes::AbstractNode,
    ).void
  end
  def on_operation_definition(node, parent)
    @definitions << node
    super
  end

  sig do
    override.params(
      node: Nodes::FragmentDefinition,
      parent: Nodes::AbstractNode,
    ).void
  end
  def on_fragment_definition(node, parent)
    @definitions << node
    super
  end
end

class GraphQL::Queries::FragmentReferencesVisitor < GraphQL::Language::Visitor
  extend T::Sig

  sig { params(node: GraphQL::Language::Nodes::AbstractNode).void }
  def initialize(node)
    super
    @references = T.let(Set.new, T::Set[String])
  end

  sig { returns(T::Set[String]) }
  attr_reader :references

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

module GraphQL::Queries::ParsedDefinition
  extend T::Sig
  extend T::Helpers

  interface!

  sig { abstract.returns(T::Set[String]) }
  def fragment_references; end
end

class GraphQL::Queries::ParsedQuery < T::Struct
  include GraphQL::Queries::ParsedDefinition

  const :definition, GraphQL::Language::Nodes::OperationDefinition
  const :fragment_references, T::Set[String]
  const :filename, String
end

class GraphQL::Queries::ParsedFragment < T::Struct
  include GraphQL::Queries::ParsedDefinition

  const :definition, GraphQL::Language::Nodes::FragmentDefinition
  const :fragment_references, T::Set[String]
  const :filename, String
end
