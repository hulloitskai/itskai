# typed: true
# frozen_string_literal: true

class Resume < ApplicationService
  # == Constants
  RESUME_PATH = T.let(Rails.root.join("config/resume.yml"), Pathname)

  # == Initialization
  sig { void }
  def initialize
    super

    # Prewarm cached copy of the resume.
    load
  end

  # == Methods
  sig { returns(T::Hash[String, T.untyped]) }
  def load
    mtime = File.mtime(RESUME_PATH).to_i
    Rails.cache.fetch("resume/#{mtime}") do
      Psych.load_file(RESUME_PATH)
    end
  end
end

class Resume
  class << self
    sig { returns(T::Hash[String, T.untyped]) }
    def load = instance.load
  end
end
