# typed: true
# frozen_string_literal: true

class FilesController < ApplicationController
  # == Filters
  before_action :set_file_blob

  # == Actions
  # GET /files/:signed_id
  def show
    file_blob = @file_blob or raise "Missing file blob"
    render(json: { file: FileSerializer.one(file_blob) })
  end

  private

  # == Filter handlers
  sig { void }
  def set_file_blob
    @file_blob = T.let(
      ActiveStorage::Blob.find_signed!(params.fetch(:signed_id)),
      T.nilable(ActiveStorage::Blob),
    )
  end
end
