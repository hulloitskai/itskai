# typed: strict
# frozen_string_literal: true

module Resume
  class << self
    extend T::Sig

    # == Methods
    sig do
      params(variant: T.nilable(Symbol)).returns(T::Hash[String, T.untyped])
    end
    def data(variant: nil)
      modified_time = File.mtime(file_path(variant))
      key = file_key(variant, modified_time)
      Rails.cache.fetch(key) do
        load(variant)
      end
    end

    private

    # == Helpers
    sig do
      params(variant: T.nilable(Symbol)).returns(T::Hash[String, T.untyped])
    end
    def load(variant)
      path = file_path(variant)
      Psych.load_file(path)
    end

    sig { params(variant: T.nilable(Symbol)).returns(Pathname) }
    def file_path(variant)
      name = ["resume", variant].compact.join("-")
      Rails.root.join("config/#{name}.yml")
    end

    sig do
      params(variant: T.nilable(Symbol), modified_time: Time)
        .returns(T.anything)
    end
    def file_key(variant, modified_time)
      [:resume, :file, variant, modified_time.to_i]
    end
  end
end
