# typed: strict
# frozen_string_literal: true

class ObsidianNoteSynchronizationJob < ApplicationJob
  extend T::Sig

  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :around_update_activity_status

  sig { params(force: T::Boolean).void }
  def perform(force: false)
    unless Obsidian.ready?
      logger.warn("Obsidian not ready; skipping")
      return
    end

    incoming_note_names = Obsidian.note_names
    all_note_names = ObsidianNote.pluck(:name)
    new_note_names = incoming_note_names - all_note_names
    orphaned_note_names = all_note_names - incoming_note_names
    existing_note_names = all_note_names - new_note_names - orphaned_note_names

    create_notes(new_note_names:)
    update_notes(existing_note_names:, force:)
    destroy_notes(orphaned_note_names:)
  end

  private

  # == Helpers
  sig { params(new_note_names: T::Array[String]).void }
  def create_notes(new_note_names:)
    created_notes = new_note_names.filter_map do |name|
      Obsidian.note(name).try! do |note|
        note = T.let(note, ObsidianNote)
        if note.save
          logger.info("Created note '#{note.name}'")
          note
        else
          message = note.errors.full_messages.to_sentence
          logger.warn("Failed to create note '#{note.name}': #{message}")
          nil
        end
      end
    end
    logger.info("Created #{created_notes.count} notes")
  end

  sig { params(existing_note_names: T::Array[String], force: T::Boolean).void }
  def update_notes(existing_note_names:, force:)
    updated_notes = existing_note_names.filter_map do |name|
      note = ObsidianNote.find_by!(name: name)
      next if !note.synchronization_required? && !force
      Obsidian.note(note.name).try! do |updated_note|
        updated_note = T.let(updated_note, ObsidianNote)
        updated_note.analyzed_at = nil if force
        if updated_note.save
          logger.info("Updated note '#{note.name}'")
          note
        else
          message = note.errors.full_messages.to_sentence
          logger.warn("Failed to update note '#{note.name}': #{message}")
          nil
        end
      end
    end
    logger.info("Updated #{updated_notes.count} notes")
  end

  sig { params(orphaned_note_names: T::Array[String]).void }
  def destroy_notes(orphaned_note_names:)
    destroyed_notes = ObsidianNote.where(name: orphaned_note_names).destroy_all
    logger.info("Destroyed #{destroyed_notes.count} notes")
  end

  # == Callbacks
  sig { params(block: T.proc.void).void }
  def around_update_activity_status(&block)
    ActivityStatus.update("Synchronizing notes")
    yield
    ActivityStatus.update("Note synchronization complete")
  end
end
