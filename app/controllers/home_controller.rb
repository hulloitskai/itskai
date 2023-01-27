# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  # == Actions
  def show
    render(inertia: "HomePage")
  end
end
