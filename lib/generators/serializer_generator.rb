# typed: true
# frozen_string_literal: true

class SerializerGenerator < Rails::Generators::NamedBase
  def copy_serializer_file
    template("serializer.rb", "app/serializers/#{serializer_file_name}")
  end

  def serializer_class_name
    class_name + "Serializer"
  end

  def serializer_file_name
    file_name + "_serializer.rb"
  end
end
