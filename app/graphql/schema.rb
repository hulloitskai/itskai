# typed: strict
# frozen_string_literal: true

# TODO: Read up on other N+1 solutions:
# https://evilmartians.com/chronicles/how-to-graphql-with-ruby-rails-active-record-and-no-n-plus-one
class Schema < GraphQL::Schema
  extend T::Sig

  # == Plugins ==
  use GraphQL::Queries
  use GraphQL::Subscriptions::ActionCableSubscriptions, broadcast: true
  use GraphQL::PersistedQueries, compiled_queries: true
  use GraphQL::Dataloader

  # == Configuration ==
  # By default, limit the maximum number of returned items in connections to 50.
  default_max_page_size 50

  # Stop validating after 100 errors.
  validate_max_errors 100

  # == Types ==
  query Types::QueryType
  mutation Types::MutationType
  subscription Types::SubscriptionType

  # == Resolvers ==
  # Resolve unions and interfaces.
  #
  # TODO: Implement this method to return the correct GraphQL object type for
  # `obj`.
  T::Sig::WithoutRuntime.sig do
    override
      .params(abstract_type: T.untyped, obj: T.untyped, ctx: T.untyped)
      .returns(T.noreturn)
  end
  def self.resolve_type(abstract_type, obj, ctx)
    raise(GraphQL::RequiredImplementationMissingError)
  end

  # Return a string UUID for `object`.
  sig do
    params(
        object: T.all(::Object, GlobalID::Identification),
        type_definition: T.untyped,
        query_ctx: T.untyped,
      )
      .returns(String)
  end
  def self.id_from_object(object, type_definition, query_ctx)
    object.to_gid_param
  end

  # Given a string UUID, find the object.
  sig do
    params(id: String, query_ctx: GraphQL::Query::Context).returns(T.untyped)
  end
  def self.object_from_id(id, query_ctx)
    GlobalID::Locator.locate(id)
  end

  # == Callbacks ==
  # GraphQL-Ruby calls this when something goes wrong while running a query.
  sig { params(err: T.untyped, context: T.untyped).returns(T.untyped) }
  def self.type_error(err, context)
    # if err.is_a?(GraphQL::InvalidNullError)
    #   # report to your bug tracker here
    #   return nil
    # end
    super
  end
end
