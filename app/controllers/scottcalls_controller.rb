# typed: true
# frozen_string_literal: true

class ScottcallsController < ApplicationController
  # == Filters
  protect_from_forgery with: :null_session, only: :receive

  # == Actions
  def handle
    if data["event_type"] == "call.answered"
      call_control_id = T.let(data.dig("payload", "call_control_id"), String)
      ScottcallService.respond(call_control_id)
    end
  end

  private

  # == Helpers
  sig { returns(T::Hash[String, T.untyped]) }
  def data
    @data = T.let(@data, T.nilable(T::Hash[String, T.untyped]))
    @data ||= params.require(:data).permit!.to_h
  end
end
