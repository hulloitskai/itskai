# typed: strict
# frozen_string_literal: true

class NotifyController < ApplicationController
  extend T::Sig

  # POST /notify
  sig { void }
  def create
    title = string_param(:title) || "Notify"
    message = string_param(:message)
    Notifi.notify(title:, message:)
  end

  private

  sig { params(param: Symbol).returns(T.nilable(String)) }
  def string_param(param)
    params[param]&.to_s
  end
end
