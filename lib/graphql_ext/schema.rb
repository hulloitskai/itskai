# typed: true
# frozen_string_literal: true

require "graphql"

class GraphQL::Schema
  class << self
    extend T::Sig

    sig { returns(T.nilable(GraphQL::Queries)) }
    attr_accessor :queries

    sig { returns(GraphQL::Queries) }
    def queries!
      queries or raise "Queries not installed"
    end

    sig { returns(GraphQL::Subscriptions) }
    def subscriptions!
      subscriptions or raise "Subscriptions not installed"
    end
  end

  module Member::BuildType
    class << self
      module Extension
        def camelize(string)
          ActiveSupport::Inflector.camelize(string, false)
        end

        def underscore(string)
          ActiveSupport::Inflector.underscore(string)
        end

        def constantize(string)
          ActiveSupport::Inflector.constantize(string) # rubocop:disable Sorbet/ConstantsFromStrings, Layout/LineLength
        end
      end

      prepend Extension
  end
  end
end
