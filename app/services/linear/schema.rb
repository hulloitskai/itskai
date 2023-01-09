# typed: strict
# frozen_string_literal: true

class Linear
  Schema = T.let(
    GraphQL::Client.load_schema(SCHEMA_PATH),
    T.untyped,
  )
end
