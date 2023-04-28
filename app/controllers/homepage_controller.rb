# typed: true
# frozen_string_literal: true

class HomepageController < ApplicationController
  # == Actions
  def show
    after = params["after"]&.to_s
    render(inertia: "HomePage", props: { after: })
  end
end
