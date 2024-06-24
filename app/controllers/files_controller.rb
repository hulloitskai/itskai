# typed: true
# frozen_string_literal: true

class FilesController < ApplicationController
  # == Filters
  before_action :set_file_blob

  # == Actions
  def show
    raise "Missing file blob" unless @file_blob
    render(json: { file: FileSerializer.one(@file_blob) })
  end

  private

  # == Filter handlers
  def set_file_blob
    @file_blob = T.let(
      ActiveStorage::Blob.find_signed!(params.fetch(:signed_id)),
      T.nilable(ActiveStorage::Blob),
    )
  end
end
