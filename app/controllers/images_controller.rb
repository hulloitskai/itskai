# typed: true
# frozen_string_literal: true

class ImagesController < ApplicationController
  # == Actions
  # GET /images/:signed_id
  def show
    blob = ActiveStorage::Blob.find_signed(params.fetch(:signed_id))
    render(json: { image: ImageSerializer.one_if(blob) })
  end
end
