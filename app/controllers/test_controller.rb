# typed: true
# frozen_string_literal: true

class TestController < ApplicationController
  # == Actions
  # GET /test
  def show
    name = "Big Papa"
    data = query!("TestPageQuery", { name: })
    ActivityStatus.current = "Displaying test page"
    render(inertia: "TestPage", props: { name:, data: })
  end
end
