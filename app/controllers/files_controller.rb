# typed: true
# frozen_string_literal: true

class FilesController < ApplicationController
  # == Actions
  # GET /files/:signed_id
  def show
    blob = ActiveStorage::Blob.find_signed!(params.fetch(:signed_id))
    render(json: { file: FileSerializer.one(blob) })
  end
end
