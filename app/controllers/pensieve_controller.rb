# typed: true
# frozen_string_literal: true

class PensieveController < ApplicationController
  # == Actions
  def show
    render(inertia: "PensievePage")
  end
end
