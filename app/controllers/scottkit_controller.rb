# typed: true
# frozen_string_literal: true

class ScottkitController < ApplicationController
  # == Actions
  def show
    render(inertia: "ScottkitPage")
  end
end
