# typed: strict
# frozen_string_literal: true

module Queries
  class ActivityStatus < BaseQuery
    extend T::Sig
    extend T::Helpers

    type String, null: true

    sig { returns(T.nilable(String)) }
    def resolve
      ::ActivityStatus.current if ::ActivityStatus.ready?
    end
  end
end
