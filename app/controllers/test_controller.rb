# typed: strict
# frozen_string_literal: true

class TestController < ApplicationController
  extend T::Sig

  sig { void }
  def show
    name = "Big Papa"
    data = query!("TestPageQuery", { name: })
    ActivityStatus.update("Displaying test page")
    render(inertia: "TestPage", props: { name:, data: })
  end
end
