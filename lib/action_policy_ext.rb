# typed: strict
# frozen_string_literal: true

module ActionPolicy::GraphQL::Fields
  extend T::Helpers

  # == Annotations
  mixes_in_class_methods ClassMethods

  module ClassMethods
    extend T::Sig
    include GraphQL::Schema::Member::GraphQLTypeNames

    # == Methods
    sig do
      params(
        rules: Symbol,
        field_name: T.untyped,
        prefix: T.untyped,
        field_options: T::Hash[Symbol, T.untyped],
        options: T.untyped,
      ).void
    end
    def expose_authorization_rules(
      *rules,
      field_name: nil,
      prefix: ::ActionPolicy::GraphQL.default_authorization_field_prefix,
      field_options: {},
      **options
    )
      T.bind(self, T.class_of(GraphQL::Schema::Object))
      if rules.size > 1 && !field_name.nil?
        raise ArgumentError,
              "Cannot specify field_name for multiple rules"
      end
      rules.each do |rule|
        gql_field_name = field_name || "#{prefix}#{rule.to_s.delete("?")}"
        field(gql_field_name, Boolean, null: false, **field_options)
        define_method(gql_field_name) do
          T.bind(self, T.all(GraphQL::Schema::Object, ActionPolicy::Behaviour))
          allowed_to?(rule, object, **options)
        end
      end
    end
  end
end
