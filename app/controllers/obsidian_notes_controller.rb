# typed: true
# frozen_string_literal: true

class ObsidianNotesController < ApplicationController
  # == Filters
  before_action :set_note

  # == Actions
  # GET /entries/1
  def show
    note = @note or raise "Missing note"
    authorize!(note)
    note_id = note.to_gid.to_s
    data = query!("ObsidianNotePageQuery", { note_id: })
    render(inertia: "ObsidianNotePage", props: { data: })
  end

  private

  # == Filter Handlers
  sig { void }
  def set_note
    @note = T.let(@note, T.nilable(ObsidianNote))
    @note = ObsidianNote.friendly.find(params.fetch(:id))
  end
end
