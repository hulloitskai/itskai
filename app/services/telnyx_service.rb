# typed: strict
# frozen_string_literal: true

class TelnyxService < ApplicationService
  class << self
    # == Lifecycle
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = [api_key, app_id, number].any?(&:nil?) || super
    end

    # == Settings
    sig { returns(T.nilable(String)) }
    def api_key
      setting("API_KEY")
    end

    sig { returns(T.nilable(String)) }
    def app_id
      setting("APP_ID")
    end

    sig { returns(T.nilable(String)) }
    def number
      setting("NUMBER")
    end

    # == Methods
    sig do
      params(number: String, display_name: T.nilable(String)).returns(Call)
    end
    def dial(number, display_name: nil)
      response = HTTParty.post(
        "https://api.telnyx.com/v2/calls",
        default_request_options.deep_merge({
          headers: {
            "Content-Type" => "application/json",
          },
          body: {
            connection_id: app_id,
            from: self.number,
            from_display_name: display_name,
            to: number,
          }.to_json,
        }),
      )
      handle_response_errors(response)
      Call.new(control_id: response.dig("data", "call_control_id"))
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
      {
        headers: {
          "Authorization" => "Bearer #{api_key}",
        },
      }
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
end
