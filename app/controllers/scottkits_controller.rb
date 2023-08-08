# typed: true
# frozen_string_literal: true

class ScottkitsController < ApplicationController
  # == Actions
  def show
    render(inertia: "ScottkitPage")
  end
end
