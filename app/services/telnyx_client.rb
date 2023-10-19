# typed: strict
# frozen_string_literal: true

require "telnyx"

class TelnyxClient < ApplicationService
  include Singleton

  # == Initialization
  sig { void }
  def initialize
    super
    @conn = T.let(
      Faraday.new("https://api.telnyx.com/v2") do |conn|
        conn.request(:authentication, "Bearer", -> { Telnyx.api_key! })
        conn.request(:json)
        conn.response(:json)
      end,
      Faraday::Connection,
    )
  end

  # == Methods
  sig do
    params(number: String, display_name: T.nilable(String)).returns(TelnyxCall)
  end
  def dial(number, display_name: nil)
    response = @conn.post("/calls", {
      connection_id: Telnyx.app_id!,
      from: Telnyx.number!,
      from_display_name: display_name,
      to: number,
    })
    raise_response_errors(response)
    TelnyxCall.new(control_id: response.body.dig("data", "call_control_id"))
  end

  sig do
    params(number: String, display_name: T.nilable(String)).returns(TelnyxCall)
  end
  def self.dial(number, display_name: nil)
    instance.dial(number, display_name: display_name)
  end

  sig { params(call_control_id: String, message: String).void }
  def speak(call_control_id, message)
    response = @conn.post("/calls/#{call_control_id}/actions/speak", {
      payload: message,
      voice: "female",
      language: "en-US",
    })
    raise_response_errors(response)
  end

  sig { params(call_control_id: String, message: String).void }
  def self.speak(call_control_id, message)
    instance.speak(call_control_id, message)
  end

  private

  # == Helpers
  sig { params(response: Faraday::Response).void }
  def raise_response_errors(response)
    if (errors = response.body["errors"])
      errors = T.let(errors, T::Array[T::Hash[String, T.untyped]])
      message = errors.first!.fetch("detail")
      raise "Telnyx error: #{message}"
    end
  end
end
