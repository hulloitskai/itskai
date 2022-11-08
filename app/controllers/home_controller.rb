# typed: true
# frozen_string_literal: true

class HomeController < ApplicationController
  extend T::Sig

  def show
    render(inertia: "HomePage")
  end
end
