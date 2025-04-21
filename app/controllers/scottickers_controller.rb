# typed: true
# frozen_string_literal: true

class ScottickersController < ApplicationController
  # GET /scottickers
  def index
    scottickers = Scotticker.order(:name)
    render(inertia: "ScottickersPage", props: {
      scottickers: ScottickerSerializer.many(scottickers),
    })
  end

  # POST /scottickers
  def create
    scotticker_params = params.require(:scotticker).permit(:name, :image)
    scotticker = Scotticker.new(scotticker_params)
    if scotticker.save
      render(
        json: {
          scotticker: ScottickerSerializer.one(scotticker),
        },
        status: :created,
      )
    else
      render(
        json: {
          errors: scotticker.form_errors,
        },
        status: :unprocessable_entity,
      )
    end
  end
end
