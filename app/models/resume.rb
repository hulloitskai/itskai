# typed: strict
# frozen_string_literal: true

module Resume
  class << self
    extend T::Sig

    # == Methods
    sig { returns(T::Hash[String, T.untyped]) }
    def data
      Rails.cache.fetch(file_key(File.mtime(file_path))) do
        load
      end
    end

    sig { returns(T::Hash[String, T.untyped]) }
    def load
      Psych.load_file(file_path)
    end

    private

    # == Helpers
    sig { returns(Pathname) }
    def file_path
      @file_path = T.let(@file_path, T.nilable(Pathname))
      @file_path ||= Rails.root.join("config/resume.yml")
    end

    sig { params(modified_time: Time).returns(T.anything) }
    def file_key(modified_time)
      [:resume, :file, modified_time.to_i]
    end
  end
end
