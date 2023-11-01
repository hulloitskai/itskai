# typed: strict
# frozen_string_literal: true

require "graphql"

module GraphQL
  class Schema
    class << self
      extend T::Sig

      # == Subscriptions
      sig { returns(Subscriptions) }
      def subscriptions!
        subscriptions or raise "Subscriptions not installed"
      end
    end

    module Member::BuildType
      class << self
        # Use application inflections.
        module Patch
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
            ActiveSupport::Inflector.constantize(string) # rubocop:disable Sorbet/ConstantsFromStrings
          end
        end
        prepend Patch
      end
    end
  end
end
