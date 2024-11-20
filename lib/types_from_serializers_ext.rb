# rubocop:disable Layout/LineLength
# frozen_string_literal: true

return unless Rails.env.development?

require "types_from_serializers"
require "oj_serializers_ext"

module TypesFromSerializers
  class << self
    # Patch the `generate` method to use a custom environment variable for
    # forcing generation.
    module RenameForceGenerationEnvironmentVariable
      def generate(force: ENV["TYPES_FROM_SERIALIZERS_FORCE"])
        super
      end
    end
    prepend RenameForceGenerationEnvironmentVariable
  end

  module SerializerRefinements
    refine Class do # rubocop:disable Sorbet/Refinement
      def ts_properties
        @ts_properties ||= begin
          model_class = _serializer_model_name&.to_model
          model_columns = model_class.try(:columns_hash) || {}
          model_enums = model_class.try(:defined_enums) || {}
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
                  property.infer_type_from(model_columns, model_enums, types_from)
                end
              end
            end
        end
      end
    end
  end

  module DSL::ClassMethods
    module TrackObjectName
      extend T::Sig
      extend T::Helpers

      requires_ancestor { T.class_of(OjSerializers::Serializer) }

      # == Methods
      def identifier(name = :id, **options)
        add_attribute(name, attribute: :method, **options, identifier: true)
      end

      def object_as(name, model: nil, types_from: nil)
        name = name.to_s
        model ||= scoped do
          model_name = name.classify
          resolved_name = suppress(NameError) { module_parent.const_get(model_name).name } # rubocop:disable Sorbet/ConstantsFromStrings
          resolved_name || model_name
        end
        super
        if Rails.env.development?
          define_singleton_method(:_serializer_object_name) { name }
        end
      end
    end
    prepend TrackObjectName
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
    using SerializerRefinements # rubocop:disable Sorbet/Refinement

    def inspect
      to_h.inspect
    end

    # Internal: Infers the property's type by checking a corresponding SQL
    # column, or falling back to a TypeScript interface if provided.
    def infer_type_from(columns_hash, defined_enums, ts_interface)
      if type
        type
      elsif (enum = defined_enums[column_name.to_s])
        self.type = enum.keys.map(&:inspect).join(" | ")
      elsif (column = columns_hash[column_name.to_s])
        self.multi = true if column.try(:array)
        self.nullable = true if column.null && !column.default
        self.type = TypesFromSerializers.config.sql_to_typescript_type_mapping[column.type]
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
