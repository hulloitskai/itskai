# typed: true
# frozen_string_literal: true

class ResumeService < ApplicationService
  # == Constants
  RESUME_PATH = T.let(Rails.root.join("config/resume.yml"), Pathname)

  class << self
    # == Methods
    sig { returns(T::Hash[String, T.untyped]) }
    def load_resume
      checked { instance.load_resume }
    end
  end

  # == Initialization
  sig { void }
  def initialize
    super

    # Prewarm cached copy of the resume.
    load_resume
  end

  # == Methods
  sig { returns(T::Hash[String, T.untyped]) }
  def load_resume
    mtime = File.mtime(RESUME_PATH).to_i
    Rails.cache.fetch("resume/file:#{mtime}") do
      Psych.load_file(RESUME_PATH)
    end
  end
end
