# typed: strict
# frozen_string_literal: true

class GraphQL::Queries
  extend T::Sig

  # == Plugin ==
  sig { params(defn: T.untyped, options: T::Hash[Symbol, T.untyped]).void }
  def self.use(defn, options = {})
    schema =
      T.let(defn.is_a?(Class) ? defn : defn.target, T.class_of(GraphQL::Schema))
    schema.queries = new(**options)
  end

  sig { void }
  def initialize
    @queries = T.let({}, T::Hash[String, GraphQL::Language::Nodes::Document])
  end

  sig { params(name: String, kwargs: T.untyped).returns(Result) }
  def execute(name, **kwargs)
    document = @queries.fetch(name) { load_query(name) }
    result = Schema.execute(document: document, **kwargs)
    data, errors = result["data"], result["errors"]
    Result.new(data: data, errors: errors)
  end

  sig { void }
  def preload
    @queries.clear
    Dir
      .foreach(Rails.root.join("app/queries"))
      .filter_map do |filename|
        if File.extname(filename) == ".graphql"
          name = File.basename(filename, ".graphql")
          name if name.end_with?("Query", "Mutation", "Subscription")
        end
      end
      .each { |name| @queries[name] = load_query(name) }
  end

  private

  sig { params(name: String).returns(GraphQL::Language::Nodes::Document) }
  def load_document(name)
    filename = Rails.root.join("app/queries", "#{name}.graphql")
    GraphQL.parse_file(filename)
  end

  sig do
    params(document: GraphQL::Language::Nodes::Document)
      .returns(T::Array[GraphQL::Language::Nodes::FragmentDefinition])
  end
  def load_fragment_definitions(document)
    visitor = FragmentVisitor.new(document)
    visitor.visit
    fragments = visitor.fragment_definitions
    visitor.fragment_names.each do |name|
      fragments.concat(load_fragment_definitions(load_document(name)))
    end
    fragments
  end

  sig { params(name: String).returns(GraphQL::Language::Nodes::Document) }
  def load_query(name)
    document = load_document(name)
    operation_definition =
      T.let(
        document.definitions.first,
        GraphQL::Language::Nodes::OperationDefinition,
      )
    fragment_definitions = load_fragment_definitions(document)
    document.merge(definitions: [operation_definition, *fragment_definitions])
  end
end

class GraphQL::Queries::Result < T::Struct
  JSONObject = T.type_alias { T::Hash[String, T.untyped] }

  const :data, T.nilable(JSONObject)
  const :errors, T.nilable(T::Array[JSONObject])
end

class GraphQL::Queries::FragmentVisitor < GraphQL::Language::Visitor
  extend T::Sig

  sig { params(document: GraphQL::Language::Nodes::Document).void }
  def initialize(document)
    super
    @fragment_definitions =
      T.let([], T::Array[GraphQL::Language::Nodes::FragmentDefinition])
    @fragment_names = T.let([], T::Array[String])
  end

  sig { returns(T::Array[GraphQL::Language::Nodes::FragmentDefinition]) }
  attr_reader :fragment_definitions

  sig { returns(T::Array[String]) }
  attr_reader :fragment_names

  sig do
    override.params(
      node: GraphQL::Language::Nodes::FragmentDefinition,
      parent: GraphQL::Language::Nodes::AbstractNode,
    ).void
  end
  def on_fragment_definition(node, parent)
    @fragment_definitions << node
  end

  sig do
    override.params(
      node: GraphQL::Language::Nodes::FragmentSpread,
      parent: GraphQL::Language::Nodes::AbstractNode,
    ).void
  end
  def on_fragment_spread(node, parent)
    @fragment_names << node.name
  end
end
