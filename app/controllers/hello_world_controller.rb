# typed: strict
# frozen_string_literal: true

class HelloWorldController < ApplicationController
  def index
    props = { name: "Stranger" }
    react_component("HelloWorld", props: props, prerender: false)
  end
end
