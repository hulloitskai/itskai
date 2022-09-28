# typed: strict
# frozen_string_literal: true

class HelloWorldController < ApplicationController
  extend T::Sig

  sig { void }
  def index
    @hello_world_props =
      T.let(@hello_world_props, T.nilable(T::Hash[Symbol, T.untyped]))
    @hello_world_props = { name: "Stranger" }
  end
end
