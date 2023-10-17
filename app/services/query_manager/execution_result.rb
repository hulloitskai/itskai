# typed: strict
# frozen_string_literal: true

class QueryManager
  class ExecutionResult < T::Struct
    # == Type Aliases
    JSONObject = T.type_alias { T::Hash[String, T.untyped] }

    # == Properties
    const :data, T.nilable(JSONObject)
    const :errors, T.nilable(T::Array[JSONObject])
  end
end
