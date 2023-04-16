# typed: true
# frozen_string_literal: true

class NotifyController < ApplicationController
  # == Actions
  # POST /notify
  def create
    title = string_param(:title) || "Notify"
    message = string_param(:message)
    NotifiService.notify(title:, message:)
  end

  private

  # == Helpers
  sig { params(param: Symbol).returns(T.nilable(String)) }
  def string_param(param)
    params[param]&.to_s
  end
end
