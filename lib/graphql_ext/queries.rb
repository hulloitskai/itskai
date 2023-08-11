# typed: strict
# frozen_string_literal: true

require "graphql"
require "rails"

module GraphQL
  class Queries
    extend T::Sig

    class Result < T::Struct
      # == Type Aliases
      JSONObject = T.type_alias { T::Hash[String, T.untyped] }

      # == Properties
      const :data, T.nilable(JSONObject)
      const :errors, T.nilable(T::Array[JSONObject])
    end

    class DefinitionsVisitor < Language::Visitor
      extend T::Sig

      # == Constants
      LanguageNodesDefinition = T.type_alias do
        T.any(Language::Nodes::OperationDefinition,
              Language::Nodes::FragmentDefinition)
      end

      # == Initialization
      sig { params(node: Language::Nodes::AbstractNode).void }
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
          node: Language::Nodes::OperationDefinition,
          parent: Language::Nodes::AbstractNode,
        ).void
      end
      def on_operation_definition(node, parent)
        @definitions << node
        super
      end

      sig do
        override.params(
          node: Language::Nodes::Field,
          parent: Language::Nodes::AbstractNode,
        ).void
      end
      def on_field(node, parent)
        add_typename_to_selections(node) if node.selections.present?
        super
      end

      sig do
        override.params(
          node: Language::Nodes::FragmentDefinition,
          parent: Language::Nodes::AbstractNode,
        ).void
      end
      def on_fragment_definition(node, parent)
        @definitions << node
        super
      end

      private

      # == Helpers
      sig { params(field: Language::Nodes::Field).void }
      def add_typename_to_selections(field)
        unless field.selections.any? { |field| field.name == "__typename" }
          field.selections << Language::Nodes::Field.new(name: "__typename")
        end
      end
    end

    class FragmentReferencesVisitor < Language::Visitor
      extend T::Sig

      # == Initialization
      sig { params(node: Language::Nodes::AbstractNode).void }
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
          node: Language::Nodes::FragmentSpread,
          parent: Language::Nodes::AbstractNode,
        ).void
      end
      def on_fragment_spread(node, parent)
        @references << node.name
        super
      end
    end

    module ParsedDefinition
      extend T::Sig
      extend T::Helpers

      # == Annotations
      interface!

      # == Interface
      sig { abstract.returns(T::Set[String]) }
      def fragment_references; end
    end

    class ParsedQuery < T::Struct
      include ParsedDefinition

      # == Properties
      const :definition, Language::Nodes::OperationDefinition
      const :fragment_references, T::Set[String]
      const :filename, String
    end

    class ParsedFragment < T::Struct
      include ParsedDefinition

      # == Properties
      const :definition, Language::Nodes::FragmentDefinition
      const :fragment_references, T::Set[String]
      const :filename, String
    end

    # == Initialization
    sig { params(schema: T.class_of(Schema)).void }
    def initialize(schema)
      @schema = schema
      @queries = T.let({}, T::Hash[String, ParsedQuery])
      @fragments = T.let({}, T::Hash[String, ParsedFragment])
      @mutex = T.let(Mutex.new, Mutex)
    end

    # == Plugin
    sig { params(defn: T.untyped, options: T::Hash[Symbol, T.untyped]).void }
    def self.use(defn, options = {})
      schema = T.let(defn.is_a?(Class) ? defn : defn.target, T.class_of(Schema))
      schema.queries = new(schema)
    end

    # == Methods
    sig { params(name: String, kwargs: T.untyped).returns(Result) }
    def execute(name, **kwargs)
      document = build_query_document(name)
      result = @schema.execute(document:, **kwargs)
      data, errors = result.to_h.values_at("data", "errors")
      Result.new(data:, errors:)
    end

    sig { params(name: String).returns(T::Boolean) }
    def include?(name)
      @queries.include?(name)
    end

    sig { void }
    def load
      @mutex.synchronize do
        @queries.clear
        @fragments.clear
      end
      filenames = Dir.glob(Rails.root.join("app/queries/**/*.graphql").to_s)
      load_files(*T.unsafe(filenames))
    end

    sig { void }
    def listen
      require "listen"

      @listener = T.let(@listener, T.nilable(Listen::Listener))
      @listener ||= Listen.to(
        Rails.root.join("app/queries"),
        only: /\.graphql$/,
      ) do
        load
      end
      @listener.start
    end

    sig { void }
    def unlisten
      @listener&.stop
    end

    private

    # == Helpers
    sig { params(filenames: String).void }
    def load_files(*filenames)
      @mutex.synchronize do
        filenames.each do |filename|
          document = GraphQL.parse_file(filename)
          definitions = resolve_document_definitions(document)
          definitions.each do |definition|
            fragment_references = resolve_fragment_references(definition)
            case definition
            when Language::Nodes::OperationDefinition
              @queries[definition.name] = ParsedQuery.new(
                definition:,
                fragment_references:,
                filename:,
              )
            when Language::Nodes::FragmentDefinition
              @fragments[definition.name] = ParsedFragment.new(
                definition:,
                fragment_references:,
                filename:,
              )
            else
              T.absurd(definition)
            end
          end
        end
      end
    end

    sig { params(name: String).returns(ParsedQuery) }
    def query!(name)
      @queries.fetch(name) { raise "Query '#{name}' not found" }
    end

    sig { params(name: String).returns(ParsedFragment) }
    def fragment!(name)
      @fragments.fetch(name) { raise "Fragment '#{name}' not found" }
    end

    sig { params(name: String).returns(Language::Nodes::Document) }
    def build_query_document(name)
      @mutex.synchronize do
        query = query!(name)
        fragment_references = build_fragment_references(query)
        fragment_definitions = fragment_references.map do |reference|
          fragment!(reference).definition
        end
        Language::Nodes::Document.new(
          definitions: [query.definition, *fragment_definitions],
        )
      end
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
      params(document: Language::Nodes::Document).returns(
        T::Array[
          T.any(
            Language::Nodes::OperationDefinition,
            Language::Nodes::FragmentDefinition,
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
      params(node: Language::Nodes::AbstractNode).returns(T::Set[String])
    end
    def resolve_fragment_references(node)
      visitor = FragmentReferencesVisitor.new(node)
      visitor.visit
      visitor.references
    end

    sig { returns(ActiveSupport::Logger) }
    def logger = Rails.logger

    sig { params(block: T.proc.void).void }
    def tag_logger(&block)
      if logger.respond_to?(:tagged)
        logger = T.cast(self.logger, ActiveSupport::TaggedLogging)
        logger.tagged(self.class.name, &block)
      end
    end
  end
end
