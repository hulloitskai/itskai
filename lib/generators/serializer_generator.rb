# typed: true
# frozen_string_literal: true

class SerializerGenerator < Rails::Generators::NamedBase
  extend T::Sig

  sig { void }
  def copy_serializer_file
    template("serializer.rb", "app/serializers/#{serializer_file_name}")
  end

  sig { returns(String) }
  def serializer_class_name
    class_name.delete_suffix("Serializer") + "Serializer"
  end

  sig { returns(String) }
  def serializer_file_name
    file_name.delete_suffix("_serializer") + "_serializer.rb"
  end
end
