# typed: strict
# frozen_string_literal: true

module Queries
  extend T::Sig
  extend T::Helpers

  requires_ancestor { Kernel }

  JSONObject = T.type_alias { T::Hash[String, T.untyped] }

  class QueryResult < T::Struct
    const :data, T.nilable(JSONObject)
    const :errors, T.nilable(T::Array[JSONObject])
  end

  private

  sig do
    params(name: String, variables: T::Hash[T.any(Symbol, String), T.untyped])
      .returns(QueryResult)
  end
  def query(name, variables = {})
    file = Rails.root.join("app/queries", "#{name}.graphql")
    document = GraphQL.parse_file(file)
    result =
      T.let(
        Schema.execute(document: document, variables: variables),
        GraphQL::Query::Result,
      )
    result = T.let(result.to_h, T::Hash[String, T.untyped])
    data, errors = result["data"], result["errors"]
    QueryResult.new(data: data, errors: errors)
  end

  sig do
    params(name: String, variables: T::Hash[T.any(Symbol, String), T.untyped])
      .returns(JSONObject)
  end
  def query!(name, variables = {})
    result = query(name, variables)
    data, errors = result.data, result.errors
    if errors.present?
      error = T.must(errors.first)
      raise error.fetch("message")
    end
    raise "missing data" if data.blank?
    data
  end
end
