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
    model_params = params.expect(model: %i[name birthday])
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
end
