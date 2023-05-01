# typed: true
# frozen_string_literal: true

class HomepageController < ApplicationController
  # == Actions
  def show
    entry = params["entry"]&.to_s
    render(inertia: "HomePage", props: { entry: })
  end
end
