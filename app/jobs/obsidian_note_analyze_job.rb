# typed: strict
# frozen_string_literal: true

class ObsidianNoteAnalyzeJob < ApplicationJob
  extend T::Sig

  sig { params(note: ObsidianNote).void }
  def perform(note)
    note.analyze
  end
end
