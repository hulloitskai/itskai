# typed: strict
# frozen_string_literal: true

module GraphQL::Querying
  extend T::Sig
  extend T::Helpers

  # == Annotations
  abstract!
  requires_ancestor { Kernel }

  private

  # == Interface
  sig { abstract.returns(T.nilable(T.any(User, Symbol))) }
  def current_user; end

  # == Helpers
  sig do
    params(
      name: String,
      variables: T::Hash[T.any(Symbol, String), T.untyped],
    ).returns(GraphQL::Queries::Result)
  end
  def query(name, variables = {})
    context = { current_user: }
    variables = variables.transform_keys do |key|
      if key.is_a?(Symbol)
        key.to_s.camelize(:lower)
      else
        key
      end
    end
    Schema.queries!.execute(name, variables:, context:)
  end

  sig do
    params(
      name: String,
      variables: T::Hash[T.any(Symbol, String), T.untyped],
    ).returns(GraphQL::Queries::Result::JSONObject)
  end
  def query!(name, variables = {})
    result = query(name, variables)
    data, errors = result.data, result.errors
    if errors.present?
      raise errors.first!.fetch("message")
    end
    data or raise "No data from query"
  end

  sig { params(name: String).returns(T::Boolean) }
  def query?(name)
    Schema.queries!.include?(name)
  end
end
