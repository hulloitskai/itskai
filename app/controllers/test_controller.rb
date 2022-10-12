# typed: strict
# frozen_string_literal: true

class TestController < ApplicationController
  extend T::Sig

  sig { void }
  def show
    render(component: "TestPage", variables: { name: "Bob Jones?" })
  end
end
