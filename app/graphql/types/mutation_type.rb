# typed: strict
# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    extend T::Sig
    extend T::Helpers

    field :test_mutation, mutation: Mutations::TestMutation
  end
end
