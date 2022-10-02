# typed: strong

module GraphQL
  class << self
    sig do
      params(graphql_string: String, tracer: T.untyped)
        .returns(GraphQL::Language::Nodes::Document)
    end
    def parse(graphql_string, tracer: T.unsafe(nil)); end
  end

  class Backtrace
    include ::Enumerable
    extend ::Forwardable
  end

  class Schema
    class << self
      sig { params(inherited: T::Boolean).returns(Subscriptions) }
      def subscriptions(inherited: true); end

      sig do
        params(query_str: T.nilable(String), kwargs: T.untyped)
          .returns(GraphQL::Query::Result)
      end
      def execute(query_str = nil, **kwargs); end
    end

    class InputObject < Member
      sig { returns(GraphQL::Query::Context) }
      def context; end
    end

    class Object < Member
      extend ::GraphQL::Schema::Member::HasFields

      sig { returns(GraphQL::Query::Context) }
      def context; end
    end

    class Member
      extend BaseDSLMethods

      module BaseDSLMethods
        sig { params(new_description: String).returns(T.nilable(String)) }
        def description(new_description = T.unsafe(nil)); end
      end

      module HasFields
        sig do
          params(
              args: T.untyped,
              kwargs: T.untyped,
              block: T.nilable(T.proc.bind(Field).void),
            )
            .returns(T.untyped)
        end
        def field(*args, **kwargs, &block); end

        def field_class(new_field_class = nil); end
      end

      module HasArguments
        def argument(*args, **kwargs, &block); end
      end
    end

    class Resolver
      extend Member::BaseDSLMethods

      sig { returns(GraphQL::Query::Context) }
      def context; end
    end

    module Interface
      mixes_in_class_methods Member::BaseDSLMethods
      mixes_in_class_methods Member::HasFields
      mixes_in_class_methods Member::RelayShortcuts
    end

    class Mutation < Resolver
      extend Member::HasFields
    end

    class Subscription < Resolver
      extend Member::HasFields
    end
  end
end
