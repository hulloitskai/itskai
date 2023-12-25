# typed: true
# frozen_string_literal: true

class Xmas2023Controller < ApplicationController
  # == Actions
  def show
    render(inertia: "Xmas2023Page")
  end
end
