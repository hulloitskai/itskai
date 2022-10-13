# typed: strict
# frozen_string_literal: true

class WorkController < ApplicationController
  extend T::Sig

  sig { void }
  def show
    render(component: "WorkPage")
  end
end