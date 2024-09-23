# typed: true
# frozen_string_literal: true

class ImagesController < ApplicationController
  # == Filters
  before_action :set_image_blob

  # == Actions
  # GET /images/:signed_id
  def show
    render(json: { image: ImageSerializer.one_if(@image_blob) })
  end

  private

  # == Filter handlers
  sig { void }
  def set_image_blob
    @image_blob = T.let(
      ActiveStorage::Blob.find_signed(params.fetch(:signed_id)),
      T.nilable(ActiveStorage::Blob),
    )
  end
end
