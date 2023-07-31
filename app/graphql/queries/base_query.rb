# typed: strict
# frozen_string_literal: true

module Queries
  class BaseQuery < GraphQL::Schema::Resolver
    extend T::Sig
    extend T::Helpers
    include ActionPolicy::GraphQL::Behaviour
    include Resolver

    # == Configuration
    argument_class Types::BaseArgument
  end
end
