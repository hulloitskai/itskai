# typed: strict
# frozen_string_literal: true

module Types
  class BaseInputObject < GraphQL::Schema::InputObject
    argument_class BaseArgument
  end
end
