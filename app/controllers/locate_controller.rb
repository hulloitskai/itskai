# typed: true
# frozen_string_literal: true

class LocateController < ApplicationController
  # == Actions
  def show
    params = LocateParams.new(self.params.permit(:password))
    params.validate!
    render(inertia: "LocatePage", props: { password: params.password })
  end
end
