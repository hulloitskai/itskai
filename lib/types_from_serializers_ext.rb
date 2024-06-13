# rubocop:disable Layout/LineLength
# frozen_string_literal: true

require "oj_serializers_ext"
require "types_from_serializers"

return unless Rails.env.development?

module TypesFromSerializers
  module SerializerRefinements
    refine Class do
      def ts_properties
        @ts_properties ||= begin
          types_from = try(:_serializer_types_from)

          prepare_attributes(
            sort_by: TypesFromSerializers.config.sort_properties_by,
            transform_keys: TypesFromSerializers.config.transform_keys || try(:_transform_keys) || DEFAULT_TRANSFORM_KEYS,
          )
            .flat_map do |key, options|
              if options[:association] == :flat
                options.fetch(:serializer).ts_properties
              else
                Property.new(
                  name: key,
                  type: options[:serializer] || options[:type],
                  optional: options[:optional] || options.key?(:if),
                  nullable: options[:nullable],
                  multi: options[:association] == :many,
                  column_name: options.fetch(:value_from),
                ).tap do |property|
                  property.infer_type_from(model_columns, types_from)
                end
              end
            end
        end
      end
    end
  end

  module DSL::ClassMethods
    module Patch
      extend T::Sig
      extend T::Helpers

      requires_ancestor { T.class_of(OjSerializers::Serializer) }

      # == Methods
      def identifier(name = :id, **options)
        add_attribute(name, attribute: :method, **options, identifier: true)
      end

      def object_as(name, model: nil, types_from: nil)
        name = name.to_s
        model ||= name.classify
        super
        if Rails.env.development?
          define_singleton_method(:_serializer_object_name) { name }
        end
      end
    end
    prepend Patch
  end

  remove_const(:Property)

  Property = Struct.new(
    :name,
    :type,
    :optional,
    :nullable,
    :multi,
    :column_name,
    keyword_init: true,
  ) do
    using SerializerRefinements

    def inspect
      to_h.inspect
    end

    # Internal: Infers the property's type by checking a corresponding SQL
    # column, or falling back to a TypeScript interface if provided.
    def infer_type_from(columns_hash, ts_interface)
      if type
        type
      elsif (column = columns_hash[column_name.to_s])
        self.multi = true if column.try(:array)
        self.nullable = true if column.null && !column.default
        self.type = TypesFromSerializers
          .config
          .sql_to_typescript_type_mapping[column.type]
      elsif ts_interface
        self.type = "#{ts_interface}['#{name}']"
      end
    end

    def as_typescript
      type_str = if type.respond_to?(:ts_name)
        type.ts_name
      else
        type || TypesFromSerializers.config.unknown_type
      end
      "#{name}#{"?" if optional}: #{type_str}#{"[]" if multi}#{" | null" if nullable}"
    end
  end
end
