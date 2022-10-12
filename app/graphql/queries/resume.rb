# typed: true
# frozen_string_literal: true

module Queries
  class Resume < BaseQuery
    extend T::Sig
    extend T::Helpers

    RESUME_PATH = Rails.root.join("config/resume.yml")

    type GraphQL::Types::JSON, null: false
    description "Kai's JSON Resume (https://jsonresume.org/)"

    sig { returns(T::Hash[String, T.untyped]) }
    def resolve
      mtime = File.mtime(RESUME_PATH).to_i
      Rails.cache.fetch("resume/#{mtime}") { Psych.load_file(RESUME_PATH) }
    end
  end
end
