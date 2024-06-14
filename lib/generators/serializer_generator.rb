# typed: true
# frozen_string_literal: true

class SerializerGenerator < Rails::Generators::NamedBase
  def copy_serializer_file
    template("serializer.rb", "app/serializers/#{file_name}.rb")
  end
end
