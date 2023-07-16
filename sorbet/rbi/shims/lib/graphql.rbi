# typed: strong

module GraphQL
  class Dataloader
    class Request
      sig {returns(Object)}
      def load; end
    end

    class RequestAll
      sig {returns(T::Array[Object])}
      def load; end
    end

    class Source
      sig {params(key: T.untyped).returns(Request)}
      def request(key); end

      sig {params(keys: T::Array[T.untyped]).returns(RequestAll)}
      def request_all(keys); end
    end

    sig do
      params(
        source_class: T::Class[T.anything],
        batch_args: T.untyped,
        batch_kwargs: T.untyped,
      ).returns(GraphQL::Dataloader::Source)
    end
    def with(source_class, *batch_args, **batch_kwargs); end
  end

  class Execution::Lookahead
    sig do
      params(
        field_name: T.any(String, Symbol),
        selected_type: T.untyped,
        arguments: T.untyped,
      ).returns(T.nilable(T.self_type))
    end
    def selection(
      field_name,
      selected_type: T.unsafe(nil),
      arguments: T.unsafe(nil)
    ); end

    sig do
      params(
        field_name: T.any(String, Symbol),
        selected_type: T.untyped,
        arguments: T.untyped,
      ).returns(T::Boolean)
    end
    def selects?(
      field_name,
      selected_type: T.unsafe(nil),
      arguments: T.unsafe(nil)
    ); end
  end

  class Result
    sig {returns(T::Hash[String, T.untyped])}
    def to_h; end
  end

  class Schema
    module Interface
      mixes_in_class_methods Member::RelayShortcuts
    end

    class Context
      sig {returns(Dataloader)}
      def dataloader; end
    end

    class Object
      sig {returns(Dataloader)}
      def dataloader; end
    end

    sig { params(inherited: T::Boolean).returns(T.nilable(Subscriptions)) }
    def self.subscriptions(inherited: true); end

    sig do
      params(query_str: T.nilable(String), kwargs: T.untyped)
        .returns(Query::Result)
    end
    def self.execute(query_str = nil, **kwargs); end

    sig do
      type_parameters(:U)
        .params(
          err_classes: T::Class[T.type_parameter(:U)],
          handler_block: T.proc.params(
            err: T.type_parameter(:U),
            obj: T.untyped,
            args: T::Hash[Symbol, T.untyped],
            context: Query::Context,
            field: T.untyped,
          ).void,
        ).void
    end
    def self.rescue_from(*err_classes, &handler_block); end
  end

  sig do
    params(filename: T.any(String, Pathname)).
      returns(Language::Nodes::Document)
  end
  def self.parse_file(filename); end
end
