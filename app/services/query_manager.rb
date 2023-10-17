# typed: strict
# frozen_string_literal: true

class QueryManager
  extend T::Sig
  include Singleton

  # == Initialization
  sig { void }
  def initialize
    @queries = T.let({}, T::Hash[String, ParsedQuery])
    @fragments = T.let({}, T::Hash[String, ParsedFragment])
    load
  end

  # == Watching
  sig { void }
  def watch
    require "listen"
    @watcher ||= T.let(
      scoped do
        watcher = Listen.to(files_dir, only: /\.graphql$/) do
          Rails.application.executor.wrap do
            load
          end
        end
        ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
          watcher.start
        end
        watcher
      end,
      T.nilable(Listen::Listener),
    )
  end

  sig { void }
  def self.watch = instance.watch

  sig { void }
  def unwatch
    if @watcher
      ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
        @watcher.stop
      end
    end
  end

  sig { void }
  def self.unwatch = instance.unwatch

  # == Methods
  sig { params(name: String, kwargs: T.untyped).returns(ExecutionResult) }
  def execute(name, **kwargs)
    document = synchronize { build_query_document(name) }
    result = Schema.execute(document:, **kwargs)
    data, errors = result.to_h.values_at("data", "errors")
    ExecutionResult.new(data:, errors:)
  end

  sig { params(name: String, kwargs: T.untyped).returns(ExecutionResult) }
  def self.execute(name, **kwargs)
    instance.execute(name, **kwargs)
  end

  sig { params(name: String).returns(T::Boolean) }
  def include?(name)
    synchronize do
      @queries.include?(name)
    end
  end

  sig { params(name: String).returns(T::Boolean) }
  def self.include?(name)
    instance.include?(name)
  end

  private

  # == Synchronization
  sig { returns(T.nilable(Concurrent::Semaphore)) }
  def semaphore
    return @semaphore if defined?(@semaphore)
    @semaphore = T.let(
      Rails.env.development? ? Concurrent::Semaphore.new(1) : nil,
      T.nilable(Concurrent::Semaphore),
    )
  end

  sig do
    type_parameters(:U)
      .params(block: T.proc.returns(T.type_parameter(:U)))
      .returns(T.type_parameter(:U))
  end
  def synchronize(&block)
    if (semaphore = self.semaphore)
      semaphore.acquire(&block)
    else
      yield
    end
  end

  # == Loading
  sig { returns(Pathname) }
  def files_dir
    Rails.root.join("app/queries")
  end

  sig { void }
  def load
    synchronize do
      @queries.clear
      @fragments.clear
      filenames = Dir.glob(files_dir.join("**/*.graphql").to_s)
      load_files(*T.unsafe(filenames))
    end
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
          @queries[definition.name] = ParsedQuery.new(
            definition:,
            fragment_references:,
            filename:,
          )
        when GraphQL::Language::Nodes::FragmentDefinition
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

  # == Helpers
  sig { params(name: String).returns(ParsedQuery) }
  def query!(name)
    @queries.fetch(name) { raise "Query '#{name}' not found" }
  end

  sig { params(name: String).returns(ParsedFragment) }
  def fragment!(name)
    @fragments.fetch(name) { raise "Fragment '#{name}' not found" }
  end

  sig { params(name: String).returns(GraphQL::Language::Nodes::Document) }
  def build_query_document(name)
    query = query!(name)
    fragment_references = build_fragment_references(query)
    fragment_definitions = fragment_references.map do |reference|
      fragment!(reference).definition
    end
    GraphQL::Language::Nodes::Document.new(
      definitions: [query.definition, *fragment_definitions],
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
    params(document: GraphQL::Language::Nodes::Document).returns(
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
