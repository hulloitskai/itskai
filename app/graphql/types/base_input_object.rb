# typed: strict
# frozen_string_literal: true

module Types
  class BaseInputObject < GraphQL::Schema::InputObject
    extend T::Sig
    extend T::Helpers

    # == Configuration
    argument_class BaseArgument
  end
end
