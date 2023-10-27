# typed: strict
# frozen_string_literal: true

# TODO: Read up on other N+1 solutions:
# https://evilmartians.com/chronicles/how-to-graphql-with-ruby-rails-active-record-and-no-n-plus-one
class Schema < GraphQL::Schema
  # == Plugins
  # use GraphQL::Connections::Stable
  use GraphQL::Subscriptions::ActionCableSubscriptions,
      broadcast: true,
      default_broadcastable: true
  use GraphQL::PersistedQueries, compiled_queries: true
  use GraphQL::Dataloader

  # == Configuration
  # By default, limit the maximum number of returned items in connections to 50.
  default_max_page_size 50

  # Stop validation after 100 errors.
  validate_max_errors 100

  # == Types
  query Types::QueryType
  mutation Types::MutationType
  subscription Types::SubscriptionType

  # == Error Handling
  rescue_from ActiveRecord::RecordInvalid do |error|
    model_name = error.record.model_name.human
    raise GraphQL::ExecutionError, "#{model_name} is invalid."
  end
  rescue_from ActiveRecord::RecordNotDestroyed do |error|
    model_name = error.record.model_name.human
    raise GraphQL::ExecutionError, "Couldn't destroy #{model_name}."
  end
  rescue_from RuntimeError do |error|
    message = error.message
    message += "." unless message.end_with?(".")
    raise GraphQL::ExecutionError, message
  end

  # == Resolvers
  # Resolve unions and interfaces.
  T::Sig::WithoutRuntime.sig do
    override.params(
      abstract_type: T.untyped,
      object: T.untyped,
      context: GraphQL::Query::Context,
    ).returns(T.nilable(String))
  end
  def self.resolve_type(abstract_type, object, context)
    if object.is_a?(ApplicationRecord)
      name = object.model_name.to_s
      type = "::Types::#{name}Type".safe_constantize
      type or raise "Unexpected record type: #{name}"
    end
  end

  # Return a string UUID for the object.
  T::Sig::WithoutRuntime.sig do
    override.params(
      object: T.all(::Object, GlobalID::Identification),
      type_definition: T.untyped,
      context: GraphQL::Query::Context,
    ).returns(String)
  end
  def self.id_from_object(object, type_definition, context)
    object.to_gid.to_s
  end

  # Given a string UUID, find the object.
  T::Sig::WithoutRuntime.sig do
    override.params(
      id: String,
      context: GraphQL::Query::Context,
    ).returns(T.untyped)
  end
  def self.object_from_id(id, context)
    context.dataloader.with(Sources::RecordByGid).load(id)
  end

  # == Callbacks
  # # Handle a failed runtime type coercion.
  # T::Sig::WithoutRuntime.sig do
  #   params(
  #     error: Exception,
  #     context: GraphQL::Query::Context,
  #   ).returns(T.untyped)
  # end
  # def self.type_error(error, context)
  #   raise error
  #   # if err.is_a?(GraphQL::InvalidNullError)
  #   #   # report to your bug tracker here
  #   #   return nil
  #   # end
  # end
end
