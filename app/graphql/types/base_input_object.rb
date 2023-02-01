# typed: true
# frozen_string_literal: true

module Types
  class BaseInputObject < GraphQL::Schema::InputObject
    # == Configuration
    argument_class BaseArgument
  end
end
