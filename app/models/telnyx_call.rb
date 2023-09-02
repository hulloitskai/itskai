# typed: strict
# frozen_string_literal: true

class TelnyxCall < T::Struct
  class << self
    extend T::Sig

    # == Methods
    sig do
      params(number: String, display_name: T.nilable(String))
        .returns(T.attached_class)
    end
    def dial(number, display_name: nil)
      response = HTTParty.post(
        "https://api.telnyx.com/v2/calls",
        default_request_options.deep_merge({
          headers: {
            "Content-Type" => "application/json",
          },
          body: {
            connection_id: Telnyx.app_id!,
            from: Telnyx.number!,
            from_display_name: display_name,
            to: number,
          }.to_json,
        }),
      )
      handle_response_errors(response)
      new(control_id: response.dig("data", "call_control_id"))
    end

    sig { params(call_control_id: String, message: String).void }
    def speak(call_control_id, message)
      response = HTTParty.post(
        "https://api.telnyx.com/v2/calls/#{call_control_id}/actions/speak",
        default_request_options.deep_merge({
          headers: {
            "Content-Type" => "application/json",
          },
          body: {
            payload: message,
            voice: "female",
            language: "en-US",
          }.to_json,
        }),
      )
      handle_response_errors(response)
    end

    private

    # == Helpers
    sig { returns(T::Hash[Symbol, T.untyped]) }
    def default_request_options
      { headers: { "Authorization" => "Bearer #{Telnyx.api_key!}" } }
    end

    sig { params(response: T.untyped).returns(NilClass) }
    def handle_response_errors(response)
      if (errors = response["errors"])
        errors = T.let(errors, T::Array[T::Hash[String, T.untyped]])
        message = errors.first!.fetch("detail")
        raise "Telnyx error: #{message}"
      end
    end
  end

  # == Properties
  const :control_id, String
end
