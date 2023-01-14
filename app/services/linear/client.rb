# typed: strict
# frozen_string_literal: true

class Linear
  Client = T.let(GraphQL::Client.new(schema: Schema, execute: Adapter),
                 GraphQL::Client)
end
