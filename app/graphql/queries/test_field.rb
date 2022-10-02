# typed: true
# frozen_string_literal: true

module Queries
  class TestField < BaseQuery
    extend T::Sig
    extend T::Helpers

    argument :echo, String, required: false

    type String, null: false

    sig { params(echo: T.nilable(String)).returns(String) }
    def resolve(echo: nil)
      echo || "(leaves rustling)"
    end
  end
end
