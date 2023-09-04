# typed: strict
# frozen_string_literal: true

class TelnyxClient
  extend T::Sig
  include HTTParty
  include Singleton

  # == Configuration
  base_uri "https://api.telnyx.com/v2"
  headers "Content-Type" => "application/json",
          "Authorization" => proc { "Bearer #{Telnyx.api_key!}" }

  # == Current
  sig { returns(TelnyxClient) }
  def self.current = instance

  # == Methods
  sig do
    params(number: String, display_name: T.nilable(String)).returns(TelnyxCall)
  end
  def dial(number, display_name: nil)
    response = self.class.post("/calls", {
      body: {
        connection_id: Telnyx.app_id!,
        from: Telnyx.number!,
        from_display_name: display_name,
        to: number,
      }.to_json,
    })
    raise_response_errors(response)
    TelnyxCall.new(control_id: response.dig("data", "call_control_id"))
  end

  sig { params(call_control_id: String, message: String).void }
  def speak(call_control_id, message)
    response = self.class.post("/calls/#{call_control_id}/actions/speak", {
      body: {
        payload: message,
        voice: "female",
        language: "en-US",
      }.to_json,
    })
    raise_response_errors(response)
  end

  private

  # == Helpers
  sig { params(response: T.untyped).void }
  def raise_response_errors(response)
    if (errors = response["errors"])
      errors = T.let(errors, T::Array[T::Hash[String, T.untyped]])
      message = errors.first!.fetch("detail")
      raise "Telnyx error: #{message}"
    end
  end
end
