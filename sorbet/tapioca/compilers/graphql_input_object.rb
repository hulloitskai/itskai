# typed: ignore
# frozen_string_literal: true

require "tapioca/dsl/compilers/graphql_input_object"
require "tapioca/dsl/helpers/graphql_type_helper"

class Tapioca::Dsl::Compilers::GraphqlInputObject
  module Extension
    def decorate
      arguments = constant.all_argument_definitions
      return if arguments.empty?

      root.create_path(constant) do |input_object|
        arguments.each do |argument|
          name = argument.keyword.to_s
          return_type = if argument.loads.nil?
            Tapioca::Dsl::Helpers::GraphqlTypeHelper.type_for(argument.type)
          else
            "T.untyped"
          end
          input_object.create_method(name, return_type:)
        end
      end
    end
  end

  prepend Extension
end
