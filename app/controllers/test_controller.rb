# typed: true
# frozen_string_literal: true

class TestController < ApplicationController
  # == Actions
  # GET /test
  def show
    name = "Big Joe"
    render(inertia: "TestPage", props: { name: })
  end

  # POST /test/submit
  def submit
    model = TestModel.new(model_params)
    if model.valid?
      render(json: { model: })
    else
      render(
        json: { errors: model.form_errors },
        status: :unprocessable_entity,
      )
    end
  end

  private

  # == Helpers
  sig { returns(ActionController::Parameters) }
  def model_params
    params.require(:model).permit(:name, :birthday)
  end
end
