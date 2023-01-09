# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  extend T::Sig

  # GET /
  def show
    data = query!("HomePageQuery")
    render(inertia: "HomePage", props: { data: })
  end
end
