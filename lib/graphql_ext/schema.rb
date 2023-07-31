# typed: true
# frozen_string_literal: true

require "graphql"

module GraphQL
  class Schema
    class << self
      extend T::Sig

      sig { returns(T.nilable(Queries)) }
      attr_accessor :queries

      sig { returns(Queries) }
      def queries!
        queries or raise "Queries not installed"
      end

      sig { returns(Subscriptions) }
      def subscriptions!
        subscriptions or raise "Subscriptions not installed"
      end
    end

    module Member::BuildType
      class << self
        module Extension
          extend T::Sig

          sig { params(string: String).returns(String) }
          def camelize(string)
            ActiveSupport::Inflector.camelize(string, false)
          end

          sig { params(string: String).returns(String) }
          def underscore(string)
            ActiveSupport::Inflector.underscore(string)
          end

          sig { params(string: String).returns(String) }
          def constantize(string)
            ActiveSupport::Inflector.constantize(string) # rubocop:disable Sorbet/ConstantsFromStrings, Layout/LineLength
          end
        end

        prepend Extension
      end
    end
  end
end
