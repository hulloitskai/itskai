# typed: true
# frozen_string_literal: true

class InitializerGenerator < Rails::Generators::NamedBase
  def copy_initializer_file
    copy_file("initializer.rb", "config/initializers/#{file_name}.rb")
  end
end
