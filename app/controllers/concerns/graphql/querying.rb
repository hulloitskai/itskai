# typed: strict
# frozen_string_literal: true

module GraphQL::Querying
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { Kernel }

  private

  sig { abstract.returns(T.nilable(User)) }
  def current_user; end

  sig do
    params(name: String, variables: T::Hash[T.any(Symbol, String), T.untyped])
      .returns(GraphQL::Queries::Result)
  end
  def query(name, variables = {})
    context = { current_user: current_user }
    Schema.queries!.execute(name, variables: variables, context: context)
  end

  sig do
    params(name: String, variables: T::Hash[T.any(Symbol, String), T.untyped])
      .returns(GraphQL::Queries::Result::JSONObject)
  end
  def query!(name, variables = {})
    result = query(name, variables)
    data, errors = result.data, result.errors
    if errors.present?
      error = T.must(errors.first)
      raise error.fetch("message")
    end
    data or raise "No data from query"
  end
end
