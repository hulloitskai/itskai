# typed: strict
# frozen_string_literal: true

class ObsidianNoteSynchronizationJob < ApplicationJob
  extend T::Sig

  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  sig { params(force: T::Boolean).void }
  def perform(force: false)
    incoming_note_names = Obsidian.note_names
    existing_notes = ObsidianNote.where(name: incoming_note_names).to_a
    existing_names = existing_notes.map(&:name)
    new_note_names = incoming_note_names - existing_names
    orphaned_note_names = existing_names - incoming_note_names
    cleanup_notes(orphaned_note_names:)
    create_notes(new_note_names:)
    update_notes(existing_notes:)
  end

  private

  sig { params(orphaned_note_names: T::Array[String]).void }
  def cleanup_notes(orphaned_note_names:)
    notes = ObsidianNote.where(name: orphaned_note_names).destroy_all
    logger.info("Destroyed #{notes.count} notes")
  end

  sig { params(new_note_names: T::Array[String]).void }
  def create_notes(new_note_names:)
    new_note_names.each do |name|
      Obsidian.note(name).tap do |note|
        note = T.let(note, ObsidianNote)
        if note.save
          logger.info("Created note '#{note.name}'")
        else
          message = note.errors.full_messages.to_sentence
          logger.warn("Failed to create note '#{note.name}': #{message}")
        end
      end
    end
  end

  sig { params(existing_notes: T::Array[ObsidianNote]).void }
  def update_notes(existing_notes:)
    existing_notes.each do |note|
      updated_note = Obsidian.note!(note.name)
      if updated_note.save
        logger.info("Updated note '#{note.name}'")
      else
        message = note.errors.full_messages.to_sentence
        logger.warn("Failed to update note '#{note.name}': #{message}")
      end
    end
  end
end
