# typed: ignore

class Graphlient::Client
  sig do
    params(
      query_or_variables: T.untyped,
      variables: T.untyped,
      block: T.untyped,
    ).returns(GraphQL::Client::Response)
  end
  def query(
    query_or_variables = T.unsafe(nil),
    variables = T.unsafe(nil),
    &block
  ); end
end
