# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Clarity
  extend T::Sig

  class Settings < T::Struct
    # == Properties
    const :project_id, String
  end

  # == Methods
  sig { returns(T.nilable(Settings)) }
  def self.settings
    if (clarity = Rails.application.credentials.clarity)
      Settings.new(project_id: clarity.project_id!)
    end
  end
end
