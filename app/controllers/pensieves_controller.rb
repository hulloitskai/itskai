# typed: true
# frozen_string_literal: true

class PensievesController < ApplicationController
  # == Actions
  def show
    render(inertia: "PensievePage")
  end
end
