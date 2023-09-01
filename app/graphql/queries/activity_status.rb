# typed: strict
# frozen_string_literal: true

module Queries
  class ActivityStatus < BaseQuery
    # == Type
    type String, null: true

    # == Resolver
    sig { returns(T.nilable(String)) }
    def resolve
      ::ActivityStatus.current
    end
  end
end
