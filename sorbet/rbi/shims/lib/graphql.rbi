# typed: ignore

class GraphQL::Schema
  sig do
    params(query_str: T.nilable(String), kwargs: T.untyped)
      .returns(GraphQL::Query::Result)
  end
  def self.execute(query_str = T.unsafe(nil), **kwargs); end
end

module GraphQL::Schema::Member::HasFields
  sig do
    params(
        args: T.untyped,
        kwargs: T.untyped,
        block: T.nilable(T.proc.bind(GraphQL::Schema::Field).void),
      )
      .returns(T.untyped)
  end
  def field(*args, **kwargs, &block); end
end

module GraphQL::Schema::Interface
  mixes_in_class_methods ::GraphQL::Schema::Member::RelayShortcuts
end

class GraphQL::Query::Context
  sig { returns(GraphQL::Dataloader) }
  def dataloader; end
end

class GraphQL::Dataloader
  sig do
    params(
        source_class: T.class_of(GraphQL::Dataloader::Source),
        batch_args: T.untyped,
        batch_kwargs: T.untyped,
      )
      .returns(GraphQL::Dataloader::Source)
  end
  def with(source_class, *batch_args, **batch_kwargs); end
end
