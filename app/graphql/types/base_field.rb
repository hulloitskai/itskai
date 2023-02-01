# typed: true
# frozen_string_literal: true

module Types
  class BaseField < GraphQL::Schema::Field
    # == Configuration
    argument_class Types::BaseArgument
  end
end
