# typed: true
# frozen_string_literal: true

module Queries
  class TestEcho < BaseQuery
    extend T::Sig
    extend T::Helpers

    argument :text, String, required: false

    type String, null: false

    sig { params(text: T.nilable(String)).returns(String) }
    def resolve(text: nil)
      text || ""
    end
  end
end
