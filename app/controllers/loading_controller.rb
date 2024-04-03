# typed: true
# frozen_string_literal: true

class LoadingController < ApplicationController
  # == Actions
  def show
    timeout = if (param = params["timeout"].presence)
      T.cast(param.to_i, Integer)
    end
    timeout ||= 4000
    render(inertia: "LoadingPage", props: { timeout: })
  end
end
