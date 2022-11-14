# typed: strict
# frozen_string_literal: true

class GraphQLChannel < ApplicationCable::Channel
  extend T::Sig

  # == Concerns ==
  include GraphQL::Helpers

  sig do
    params(
      connection: ApplicationCable::Connection,
      identifier: T.untyped,
      params: T.untyped,
    ).void
  end
  def initialize(connection, identifier, params)
    super(connection, identifier, params)
    @identifier = T.let(@identifier, T.untyped)
    @subscription_ids = T.let([], T::Array[String])
  end

  # Type signature must not have a runtime in order not to interfere with
  # ActionCable::Channel::Base's arity checks.
  T::Sig::WithoutRuntime.sig do
    params(data: T::Hash[String, T.untyped]).returns(T.untyped)
  end
  def execute(data)
    params =
      T.let(
        data.with_indifferent_access,
        T::Hash[T.any(Symbol, String), T.untyped],
      )

    operation_name = params["operationName"]
    unless operation_name.nil?
      raise "operationName must be a String" unless operation_name.is_a?(String)
    end
    query = params["query"]
    unless query.nil?
      raise "query must be a String" unless query.is_a?(String)
    end

    variables = prepare_variables(params["variables"])
    extensions = prepare_extensions(params["extensions"])
    context = { extensions: extensions, current_user: current_user }

    result =
      Schema.execute(
        query,
        variables: variables,
        operation_name: operation_name,
        context: context,
      )
    payload = { result: result.to_h, more: result.subscription? }

    # Track the subscription here so we can remove it
    # on unsubscribe.
    if result.context[:subscription_id]
      @subscription_ids << result.context[:subscription_id]
    end

    transmit(payload)
  end

  private

  sig { void }
  def subscribed
    @subscription_ids = []
  end

  sig { void }
  def unsubscribed
    @subscription_ids.each do |sid|
      Schema.subscriptions!.delete_subscription(sid)
    end
  end

  # Log a pretty GraphQL call signature.
  sig { override.params(action: Symbol, data: T.untyped).returns(String) }
  def action_signature(action, data)
    signature = +"#{self.class.name}##{action}"
    config = GraphQL::RailsLogger.configuration
    params =
      T.let(
        data.with_indifferent_access,
        T::Hash[T.any(Symbol, String), T.untyped],
      )

    # Initialize lexers and formatters.
    formatter = Rouge::Formatters::Terminal256.new(config.theme)
    gql = Rouge::Lexers::GraphQL.new
    rb = Rouge::Lexers::Ruby.new

    # Cleanup and indent params for logging.
    query = indent(params.fetch("query", ""))
    variables = indent(pretty(params.fetch("variables", "")))
    extensions = indent(pretty(params.fetch("extensions", "")))

    # Skip introspection query, if applicable.
    if config.skip_introspection_query &&
         query.index(/query IntrospectionQuery/)
      query = "    query IntrospectionQuery { ... }"
    end

    # Add query, variables, and extensions.
    if query.present?
      signature << "\n  Query:"
      signature << "\n#{formatter.format(rb.lex(query))}"
    end
    if variables.present?
      signature << "\n  Variables:"
      signature << "\n#{formatter.format(gql.lex(variables))}"
    end
    if extensions.present?
      signature << "\n  Extensions:"
      signature << "\n#{formatter.format(rb.lex(extensions))}"
    end
    signature
  end

  # Transmit a hash of data to the subscriber. The hash will automatically be
  # wrapped in a JSON envelope with the proper channel identifier marked as the
  # recipient.
  sig { params(data: T.untyped, via: T.untyped).returns(T.untyped) }
  def transmit(data, via: nil)
    if Rails.env.development?
      status = "#{self.class.name} transmitting #{data.inspect.truncate(300)}"
      status << " (via #{via})" if via
      status << "\n\n"
      logger.debug(status)
    end

    payload = { channel_class: self.class.name, data: data, via: via }
    ActiveSupport::Notifications.instrument("transmit.action_cable", payload) do
      connection.transmit(identifier: @identifier, message: data)
    end
  end

  sig { params(data: T.untyped).returns(T.untyped) }
  def indent(data)
    data.lines.map { |line| "    #{line}" }.join.chomp
  end

  sig { params(data: T.untyped).returns(T.untyped) }
  def pretty(data)
    return "" if data.blank?
    data = JSON.parse(data) if data.is_a?(String)
    PP.pp(data, "")
  end
end
