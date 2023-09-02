# typed: strict
# frozen_string_literal: true

class TelnyxClient
  extend T::Sig
  include HTTParty
  include Singleton

  # == Configuration
  base_uri "https://api.telnyx.com/v2"
  headers "Content-Type" => "application/json"

  # == Current
  sig { returns(TelnyxClient) }
  def self.current = instance

  # == Methods
  sig do
    params(number: String, display_name: T.nilable(String)).returns(TelnyxCall)
  end
  def dial(number, display_name: nil)
    response = self.class.post("/calls", request_options({
      body: {
        connection_id: Telnyx.app_id!,
        from: Telnyx.number!,
        from_display_name: display_name,
        to: number,
      }.to_json,
    }))
    raise_response_errors(response)
    TelnyxCall.new(control_id: response.dig("data", "call_control_id"))
  end

  sig { params(call_control_id: String, message: String).void }
  def speak(call_control_id, message)
    response = self.class.post(
      "/calls/#{call_control_id}/actions/speak",
      request_options({
        body: {
          payload: message,
          voice: "female",
          language: "en-US",
        }.to_json,
      }),
    )
    raise_response_errors(response)
  end

  private

  # == Helpers
  sig { returns(T::Hash[Symbol, T.untyped]) }
  def default_request_options
    { headers: { "Authorization" => "Bearer #{Telnyx.api_key!}" } }
  end

  sig do
    params(options: T::Hash[Symbol, T.untyped])
      .returns(T::Hash[Symbol, T.untyped])
  end
  def request_options(options = {})
    default_request_options.deep_merge(options)
  end

  sig { params(response: T.untyped).void }
  def raise_response_errors(response)
    if (errors = response["errors"])
      errors = T.let(errors, T::Array[T::Hash[String, T.untyped]])
      message = errors.first!.fetch("detail")
      raise "Telnyx error: #{message}"
    end
  end
end
