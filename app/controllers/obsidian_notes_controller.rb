# typed: strict
# frozen_string_literal: true

class ObsidianNotesController < ApplicationController
  # == Filters
  before_action :set_note

  # == Actions
  sig { void }
  def show
    note = T.must(@note)
    authorize!(note)
    note_id = note.to_gid.to_s
    data = query!("ObsidianNotePageQuery", { note_id: })
    render(inertia: "ObsidianNotePage", props: { data: })
  end

  private

  # == Filters
  sig { void }
  def set_note
    @note = T.let(@note, T.nilable(ObsidianNote))
    @note = ObsidianNote.friendly.find(params[:id])
  end
end
