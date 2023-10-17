# typed: strict
# frozen_string_literal: true

class GraphQLChannel < ApplicationCable::Channel
  include GraphQLEntrypoint

  # == Initialization
  sig do
    params(
      connection: ApplicationCable::Connection,
      identifier: T.untyped,
      params: T.untyped,
    ).void
  end
  def initialize(connection, identifier, params)
    super
    @subscription_ids = T.let([], T::Array[String])
  end

  # == Subscription
  # Type signature must not have a runtime in order not to interfere with
  # ActionCable::Channel::Base's arity checks.
  T::Sig::WithoutRuntime.sig do
    params(data: T::Hash[String, T.untyped]).returns(T.untyped)
  end
  def execute(data)
    # Parse data
    params = data.with_indifferent_access
    operation_name = params["operationName"]
    unless operation_name.nil?
      raise "operationName must be a String" unless operation_name.is_a?(String)
    end
    query = params["query"]
    unless query.nil?
      raise "query must be a String" unless query.is_a?(String)
    end

    # Execute query
    variables = prepare_variables(params["variables"])
    extensions = prepare_extensions(params["extensions"])
    context = {
      channel: self,
      extensions:,
      current_user:,
      actor_id: cookies.signed[:actor_id],
    }
    result = Schema.execute(query, variables:, operation_name:, context:)

    # Track the subscription here so we can remove it on unsubscribe
    if result.context[:subscription_id]
      @subscription_ids << result.context[:subscription_id]
    end

    # Transmit result
    payload = { result: result.to_h, more: result.subscription? }
    transmit(payload)
  end

  private

  # == Helpers
  sig { returns(ActionDispatch::Request) }
  def request = connection.request

  sig { returns(ActionDispatch::Cookies::CookieJar) }
  def cookies
    ActionDispatch::Cookies::CookieJar.build(request, request.cookies)
  end

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

  # == Logging
  # Log a pretty GraphQL call signature.
  sig { override.params(action: Symbol, data: T.untyped).returns(String) }
  def action_signature(action, data)
    signature = +"#{self.class.name}##{action}"
    config = GraphQL::RailsLogger.configuration
    params = data.with_indifferent_access

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
    payload = { channel_class: self.class.name, data:, via: }
    ActiveSupport::Notifications.instrument("transmit.action_cable", payload) do
      connection.transmit(identifier:, message: data)
    end
  end

  sig { params(data: T.untyped).returns(String) }
  def indent(data)
    data.lines.map { |line| "    #{line}" }.join.chomp
  end

  sig { params(data: T.untyped).returns(String) }
  def pretty(data)
    if data.present?
      data = JSON.parse(data) if data.is_a?(String)
      PP.pp(data, +"")
    else
      ""
    end
  end
end
