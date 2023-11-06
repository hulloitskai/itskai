# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"
require "rails"

module Resume
  extend T::Sig

  # == Current
  sig do
    params(variant: T.nilable(Symbol)).returns(T::Hash[String, T.untyped])
  end
  def self.current(variant: nil)
    modified_time = File.mtime(file_path(variant))
    key = file_key(variant, modified_time)
    Rails.cache.fetch(key) { load_file(variant) }
  end

  private

  # == Helpers
  sig do
    params(variant: T.nilable(Symbol)).returns(T::Hash[String, T.untyped])
  end
  private_class_method def self.load_file(variant)
    path = file_path(variant)
    Psych.load_file(path)
  end

  sig { params(variant: T.nilable(Symbol)).returns(Pathname) }
  private_class_method def self.file_path(variant)
    name = ["resume", variant].compact.join("-")
    Rails.root.join("config/#{name}.yml")
  end

  sig do
    params(variant: T.nilable(Symbol), modified_time: Time)
      .returns(T.anything)
  end
  private_class_method def self.file_key(variant, modified_time)
    [:resume, :file, variant, modified_time.to_i]
  end
end
