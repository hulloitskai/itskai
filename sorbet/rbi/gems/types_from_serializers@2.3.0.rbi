# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `types_from_serializers` gem.
# Please instead update this file by running `bin/tapioca gem types_from_serializers`.


# Public: Automatically generates TypeScript interfaces for Ruby serializers.
#
# source://types_from_serializers//lib/types_from_serializers/version.rb#3
module TypesFromSerializers
  class << self
    # Public: Configuration of the code generator.
    #
    # source://types_from_serializers//lib/types_from_serializers/generator.rb#268
    def config; end

    # Returns the value of attribute force_generation.
    #
    # source://types_from_serializers//lib/types_from_serializers/generator.rb#265
    def force_generation; end

    # Public: Generates code for all serializers in the app.
    def generate(force: T.unsafe(nil)); end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#290
    def generate_changed; end

    # Internal: Allows to import all serializer types from a single file.
    #
    # source://types_from_serializers//lib/types_from_serializers/generator.rb#309
    def generate_index_file; end

    # Internal: Defines a TypeScript interface for the serializer.
    #
    # source://types_from_serializers//lib/types_from_serializers/generator.rb#300
    def generate_interface_for(serializer); end

    # Internal: Checks if it should avoid generating an interface.
    #
    # @return [Boolean]
    #
    # source://types_from_serializers//lib/types_from_serializers/generator.rb#318
    def skip_serializer?(serializer); end

    # Internal: Returns an object compatible with FileUpdateChecker.
    #
    # source://types_from_serializers//lib/types_from_serializers/generator.rb#324
    def track_changes; end

    private

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#338
    def all_serializer_files; end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#334
    def changes; end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#447
    def declaration_interface_definition(interface); end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#356
    def default_config(root); end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#342
    def load_serializers(files); end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#346
    def loaded_serializers; end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#330
    def root; end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#434
    def serializer_interface_content(interface); end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#424
    def serializers_index_content(serializers); end

    # Internal: Returns true if the cache key has changed since the last codegen.
    #
    # @return [Boolean]
    #
    # source://types_from_serializers//lib/types_from_serializers/generator.rb#461
    def stale?(file, cache_key_comment); end

    # source://types_from_serializers//lib/types_from_serializers/generator.rb#438
    def standard_interface_definition(interface); end

    # Internal: Writes if the file does not exist or the cache key has changed.
    # The cache strategy consists of a comment on the first line of the file.
    #
    # Yields to receive the rendered file content when it needs to.
    #
    # source://types_from_serializers//lib/types_from_serializers/generator.rb#411
    def write_if_changed(filename:, cache_key:, extension: T.unsafe(nil)); end
  end
end

# Internal: Structure to keep track of changed files.
#
# source://types_from_serializers//lib/types_from_serializers/generator.rb#221
class TypesFromSerializers::Changes
  # @return [Changes] a new instance of Changes
  #
  # source://types_from_serializers//lib/types_from_serializers/generator.rb#222
  def initialize(dirs); end

  # @return [Boolean]
  #
  # source://types_from_serializers//lib/types_from_serializers/generator.rb#233
  def any_removed?; end

  # source://types_from_serializers//lib/types_from_serializers/generator.rb#245
  def clear; end

  # source://types_from_serializers//lib/types_from_serializers/generator.rb#237
  def modified_files; end

  # @return [Boolean]
  #
  # source://types_from_serializers//lib/types_from_serializers/generator.rb#241
  def only_modified?; end

  # @return [Boolean]
  #
  # source://types_from_serializers//lib/types_from_serializers/generator.rb#229
  def updated?; end

  private

  # source://types_from_serializers//lib/types_from_serializers/generator.rb#253
  def track_changes(dirs); end
end

# Internal: The configuration for TypeScript generation.
#
# source://types_from_serializers//lib/types_from_serializers/generator.rb#88
class TypesFromSerializers::Config < ::Struct
  # Returns the value of attribute base_serializers
  #
  # @return [Object] the current value of base_serializers
  def base_serializers; end

  # Sets the attribute base_serializers
  #
  # @param value [Object] the value to set the attribute base_serializers to.
  # @return [Object] the newly set value
  def base_serializers=(_); end

  # Returns the value of attribute custom_types_dir
  #
  # @return [Object] the current value of custom_types_dir
  def custom_types_dir; end

  # Sets the attribute custom_types_dir
  #
  # @param value [Object] the value to set the attribute custom_types_dir to.
  # @return [Object] the newly set value
  def custom_types_dir=(_); end

  # Returns the value of attribute global_types
  #
  # @return [Object] the current value of global_types
  def global_types; end

  # Sets the attribute global_types
  #
  # @param value [Object] the value to set the attribute global_types to.
  # @return [Object] the newly set value
  def global_types=(_); end

  # Returns the value of attribute name_from_serializer
  #
  # @return [Object] the current value of name_from_serializer
  def name_from_serializer; end

  # Sets the attribute name_from_serializer
  #
  # @param value [Object] the value to set the attribute name_from_serializer to.
  # @return [Object] the newly set value
  def name_from_serializer=(_); end

  # Returns the value of attribute namespace
  #
  # @return [Object] the current value of namespace
  def namespace; end

  # Sets the attribute namespace
  #
  # @param value [Object] the value to set the attribute namespace to.
  # @return [Object] the newly set value
  def namespace=(_); end

  # Returns the value of attribute output_dir
  #
  # @return [Object] the current value of output_dir
  def output_dir; end

  # Sets the attribute output_dir
  #
  # @param value [Object] the value to set the attribute output_dir to.
  # @return [Object] the newly set value
  def output_dir=(_); end

  # source://types_from_serializers//lib/types_from_serializers/generator.rb#102
  def relative_custom_types_dir; end

  # Returns the value of attribute serializers_dirs
  #
  # @return [Object] the current value of serializers_dirs
  def serializers_dirs; end

  # Sets the attribute serializers_dirs
  #
  # @param value [Object] the value to set the attribute serializers_dirs to.
  # @return [Object] the newly set value
  def serializers_dirs=(_); end

  # Returns the value of attribute skip_serializer_if
  #
  # @return [Object] the current value of skip_serializer_if
  def skip_serializer_if; end

  # Sets the attribute skip_serializer_if
  #
  # @param value [Object] the value to set the attribute skip_serializer_if to.
  # @return [Object] the newly set value
  def skip_serializer_if=(_); end

  # Returns the value of attribute sort_properties_by
  #
  # @return [Object] the current value of sort_properties_by
  def sort_properties_by; end

  # Sets the attribute sort_properties_by
  #
  # @param value [Object] the value to set the attribute sort_properties_by to.
  # @return [Object] the newly set value
  def sort_properties_by=(_); end

  # Returns the value of attribute sql_to_typescript_type_mapping
  #
  # @return [Object] the current value of sql_to_typescript_type_mapping
  def sql_to_typescript_type_mapping; end

  # Sets the attribute sql_to_typescript_type_mapping
  #
  # @param value [Object] the value to set the attribute sql_to_typescript_type_mapping to.
  # @return [Object] the newly set value
  def sql_to_typescript_type_mapping=(_); end

  # Returns the value of attribute transform_keys
  #
  # @return [Object] the current value of transform_keys
  def transform_keys; end

  # Sets the attribute transform_keys
  #
  # @param value [Object] the value to set the attribute transform_keys to.
  # @return [Object] the newly set value
  def transform_keys=(_); end

  # source://types_from_serializers//lib/types_from_serializers/generator.rb#106
  def unknown_type; end

  class << self
    def [](*_arg0); end
    def inspect; end
    def keyword_init?; end
    def members; end
    def new(*_arg0); end
  end
end

# source://types_from_serializers//lib/types_from_serializers/generator.rb#9
TypesFromSerializers::DEFAULT_TRANSFORM_KEYS = T.let(T.unsafe(nil), Proc)

# source://types_from_serializers//lib/types_from_serializers/dsl.rb#7
module TypesFromSerializers::DSL
  extend ::ActiveSupport::Concern

  mixes_in_class_methods ::TypesFromSerializers::DSL::ClassMethods
end

# source://types_from_serializers//lib/types_from_serializers/dsl.rb#10
module TypesFromSerializers::DSL::ClassMethods
  # Override: Capture the name of the model related to the serializer.
  #
  # name - An alias for the internal object in the serializer.
  # model - The name of an ActiveRecord model to infer types from the schema.
  # types_from - The name of a TypeScript interface to infer types from.
  def object_as(name, model: T.unsafe(nil), types_from: T.unsafe(nil)); end

  # Public: Shortcut for typing a serializer attribute.
  #
  # It specifies the type for a serializer method that will be defined
  # immediately after calling this method.
  #
  # source://types_from_serializers//lib/types_from_serializers/dsl.rb#31
  def type(type, **options); end
end

# Internal: Information to generate a TypeScript interface for a serializer.
#
# source://types_from_serializers//lib/types_from_serializers/generator.rb#112
class TypesFromSerializers::Interface < ::Struct
  # source://types_from_serializers//lib/types_from_serializers/generator.rb#145
  def as_typescript; end

  # Returns the value of attribute filename
  #
  # @return [Object] the current value of filename
  def filename; end

  # Sets the attribute filename
  #
  # @param value [Object] the value to set the attribute filename to.
  # @return [Object] the newly set value
  def filename=(_); end

  # source://types_from_serializers//lib/types_from_serializers/generator.rb#120
  def inspect; end

  # Returns the value of attribute name
  #
  # @return [Object] the current value of name
  def name; end

  # Sets the attribute name
  #
  # @param value [Object] the value to set the attribute name to.
  # @return [Object] the newly set value
  def name=(_); end

  # Returns the value of attribute properties
  #
  # @return [Object] the current value of properties
  def properties; end

  # Sets the attribute properties
  #
  # @param value [Object] the value to set the attribute properties to.
  # @return [Object] the newly set value
  def properties=(_); end

  # Internal: Returns a list of imports for types used in this interface.
  #
  # source://types_from_serializers//lib/types_from_serializers/generator.rb#125
  def used_imports; end

  protected

  # Internal: Extracts any types inside generics or array types.
  #
  # source://types_from_serializers//lib/types_from_serializers/generator.rb#167
  def extract_typescript_types(type); end

  # NOTE: Treat uppercase names as custom types.
  # Lowercase names would be native types, such as :string and :boolean.
  #
  # @return [Boolean]
  #
  # source://types_from_serializers//lib/types_from_serializers/generator.rb#173
  def global_type?(type); end

  # source://types_from_serializers//lib/types_from_serializers/generator.rb#156
  def pathname; end

  # Internal: Calculates a relative path that can be used in an import.
  #
  # source://types_from_serializers//lib/types_from_serializers/generator.rb#161
  def relative_path(target_path, importer_path); end

  class << self
    def [](*_arg0); end
    def inspect; end
    def keyword_init?; end
    def members; end
    def new(*_arg0); end
  end
end

# source://types_from_serializers//lib/types_from_serializers/railtie.rb#5
class TypesFromSerializers::Railtie < ::Rails::Railtie; end

# Internal: Extensions that simplify the implementation of the generator.
#
# source://types_from_serializers//lib/types_from_serializers/generator.rb#12
module TypesFromSerializers::SerializerRefinements; end

# Public: This library adheres to semantic versioning.
#
# source://types_from_serializers//lib/types_from_serializers/version.rb#5
TypesFromSerializers::VERSION = T.let(T.unsafe(nil), String)