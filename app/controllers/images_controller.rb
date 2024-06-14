# typed: true
# frozen_string_literal: true

class ImagesController < ApplicationController
  # == Filters
  before_action :set_image_blob

  # == Actions
  def show
    image_blob = T.must(@image_blob)
    unless image_blob.image?
      raise ActiveRecord::RecordNotFound, "Couldn't find Image"
    end
    render(json: { image: ImageSerializer.one(image_blob) })
  end

  private

  # == Filter Handlers
  def set_image_blob
    @image_blob = T.let(
      ActiveStorage::Blob.find_signed!(params.fetch(:signed_id)),
      T.nilable(ActiveStorage::Blob),
    )
  end
end
