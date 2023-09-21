# typed: true
# frozen_string_literal: true

class ScottcallsController < ApplicationController
  # == Filters
  protect_from_forgery with: :null_session, only: :receive

  # == Actions
  def handle
    if data["event_type"] == "call.answered"
      call_control_id = T.let(data.dig("payload", "call_control_id"), String)
      call = Scottcall.find_by!(telnyx_call_control_id: call_control_id)
      TelnyxClient.speak(call_control_id, call.message)
    end
  end

  private

  sig { returns(T::Hash[String, T.untyped]) }
  def data
    @data ||= T.let(
      params.require(:data).to_unsafe_h,
      T.nilable(T::Hash[String, T.untyped]),
    )
  end
end
