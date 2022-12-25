# typed: strict
# frozen_string_literal: true

class ObsidianNoteSynchronizeJob < ApplicationJob
  extend T::Sig

  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  sig { params(note: ObsidianNote, force: T::Boolean).void }
  def perform(note, force: false)
    unless Obsidian.ready?
      logger.warn("Obsidian not ready; skipping")
      return
    end
    return if !force && !note.synchronization_required?
    updated_note = Obsidian.note(note.name)
    if updated_note.nil?
      note.destroy!
      logger.info("Destroyed note '#{note.name}'")
    else
      updated_note.save!
      logger.info("Updated note '#{note.name}'")
    end
  end
end
