# typed: strict
# frozen_string_literal: true

class HomeController < ApplicationController
  extend T::Sig

  sig { void }
  def show
    render(component: "HomePage", variables: { name: "Bob Jones?" })
  end
end
