# typed: true
# frozen_string_literal: true

module Queries
  class Resume < BaseQuery
    # == Constants
    RESUME_PATH = T.let(Rails.root.join("config/resume.yml"), Pathname)

    # == Configuration
    description "Kai's JSON Resume (https://jsonresume.org/)."

    # == Type
    type GraphQL::Types::JSON, null: false

    # == Resolver
    sig { returns(T::Hash[String, T.untyped]) }
    def resolve
      mtime = File.mtime(RESUME_PATH).to_i
      Rails.cache.fetch("resume/#{mtime}") { Psych.load_file(RESUME_PATH) }
    end
  end
end
