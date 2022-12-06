# typed: strong

module GraphQL
  sig do
    params(filename: T.any(String, Pathname))
      .returns(GraphQL::Language::Nodes::Document)
  end
  def self.parse_file(filename); end
end

class GraphQL::Schema
  sig do
    params(inherited: T::Boolean).returns(T.nilable(GraphQL::Subscriptions))
  end
  def self.subscriptions(inherited: true); end

  sig do
    params(query_str: T.nilable(String), kwargs: T.untyped)
      .returns(GraphQL::Query::Result)
  end
  def self.execute(query_str = nil, **kwargs); end
end

class GraphQL::Query::Context
  sig {returns(GraphQL::Dataloader)}
  def dataloader
  end
end

class GraphQL::Schema::Object
  sig {returns(GraphQL::Dataloader)}
  def dataloader
  end
end

class GraphQL::Dataloader
  sig do
    params(
      source_class: Class,
      batch_args: T.untyped,
      batch_kwargs: T.untyped,
    ).returns(GraphQL::Dataloader::Source)
  end
  def with(source_class, *batch_args, **batch_kwargs); end
end

class GraphQL::Dataloader::Source
  sig {params(key: T.untyped).returns(GraphQL::Dataloader::Request)}
  def request(key); end

  sig {params(keys: T::Array[T.untyped]).returns(GraphQL::Dataloader::RequestAll)}
  def request_all(keys); end
end

class GraphQL::Dataloader::Request
  sig {returns(Object)}
  def load
  end
end

class GraphQL::Dataloader::RequestAll
  sig {returns(T::Array[Object])}
  def load
  end
end

module GraphQL::Schema::Interface
  mixes_in_class_methods GraphQL::Schema::Member::RelayShortcuts
end

class GraphQL::Result
  sig {returns(T::Hash[String, T.untyped])}
  def to_h
  end
end

class GraphQL::Execution::Lookahead
  sig {params(field_name: T.any(String, Symbol), selected_type: T.untyped, arguments: T.untyped).returns(T.nilable(T.self_type))}
  def selection(field_name, selected_type: T.unsafe(nil), arguments: T.unsafe(nil)); end

  sig {params(field_name: T.any(String, Symbol), selected_type: T.untyped, arguments: T.untyped).returns(T::Boolean)}
  def selects?(field_name, selected_type: T.unsafe(nil), arguments: T.unsafe(nil)); end
end
