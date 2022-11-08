# typed: strict
# frozen_string_literal: true

class TestController < ApplicationController
  extend T::Sig

  sig { void }
  def show
    name = "Big Papa"
    data = query!("TestPageQuery", { name: name })
    render(inertia: "TestPage", props: { name: name, data: data })
  end
end
