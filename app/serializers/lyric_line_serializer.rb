# typed: true
# frozen_string_literal: true

class LyricLineSerializer < ApplicationSerializer
  # == Configuration
  object_as :line, model: "LyricLine"

  # == Attributes
  attributes words: { type: :string }, start_time_ms: { type: :number }
end
