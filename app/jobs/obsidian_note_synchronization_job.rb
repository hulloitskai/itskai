# typed: strict
# frozen_string_literal: true

class ObsidianNoteSynchronizationJob < ApplicationJob
  extend T::Sig

  # == Configuration
  good_job_control_concurrency_with key: name, total_limit: 1

  # == Callbacks
  around_perform :with_activity_status

  # == Job
  sig { params(force: T::Boolean).void }
  def perform(force: false)
    unless ObsidianService.ready?
      logger.warn("Obsidian not ready; skipping")
      return
    end

    incoming_note_names = ObsidianService.note_names
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
      Rails.error.handle(context: { note_name: name }) do
        ObsidianService.note(name).try! do |note|
          note = T.let(note, ObsidianNote)
          note.save!.tap do
            logger.info("Created note '#{note.name}'")
          end
        end
      rescue => error
        logger.error("Failed to create '#{name}': #{error}")
        raise error
      end
    end
    logger.info("Created #{created_notes.count} notes")
  end

  sig { params(existing_note_names: T::Array[String], force: T::Boolean).void }
  def update_notes(existing_note_names:, force:)
    updated_notes = existing_note_names.filter_map do |name|
      Rails.error.handle(context: { note_name: name }) do
        note = ObsidianNote.find_by!(name: name)
        next if !note.synchronization_required? && !force
        ObsidianService.note(note.name).try! do |updated_note|
          updated_note = T.let(updated_note, ObsidianNote)
          updated_note.analyzed_at = nil if force
          updated_note.save!.tap do
            logger.info("Updated note '#{updated_note.name}'")
          end
        end
      rescue => error
        logger.error("Failed to update '#{name}': #{error}")
        raise error
      end
    end
    logger.info("Updated #{updated_notes.count} notes")
  end

  sig { params(orphaned_note_names: T::Array[String]).void }
  def destroy_notes(orphaned_note_names:)
    destroyed_notes = ObsidianNote.where(name: orphaned_note_names)
      .filter_map do |note|
        Rails.error.handle(context: { note_name: note.name }) do
          note.destroy!
        rescue => error
          logger.error("Failed to destroy '#{note.name}': #{error}")
          raise error
        end
      end
    logger.info("Destroyed #{destroyed_notes.count} notes")
  end

  # == Callbacks
  sig { params(block: T.proc.void).void }
  def with_activity_status(&block)
    ActivityService.update_status("Synchronizing notes")
    yield
    ActivityService.update_status("Note synchronization complete")
  end
end
