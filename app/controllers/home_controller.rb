# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  # == Actions
  def show
    after = params["after"]&.to_s
    render(inertia: "HomePage", props: { after: })
  end
end
