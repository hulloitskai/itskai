# typed: true
# frozen_string_literal: true

class TelnyxService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def disabled?
      return @disabled if defined?(@disabled)
      @disabled = super || [api_key, app_id, number].any?(&:blank?)
    end

    # == Methods
    sig { returns(T.nilable(String)) }
    def api_key
      return @api_key if defined?(@api_key)
      @api_key = ENV["TELNYX_API_KEY"]
    end

    sig { returns(T.nilable(String)) }
    def app_id
      return @app_id if defined?(@app_id)
      @app_id = ENV["TELNYX_APP_ID"]
    end

    sig { returns(T.nilable(String)) }
    def number
      return @number if defined?(@number)
      @number = ENV["TELNYX_NUMBER"]
    end

    sig do
      params(number: String, display_name: T.nilable(String)).returns(Call)
    end
    def dial(number, display_name: nil)
      checked { instance.dial(number, display_name:) }
    end

    sig { params(call_control_id: String, message: String).void }
    def speak(call_control_id, message)
      checked { instance.speak(call_control_id, message) }
    end
  end

  # == Methods
  sig { returns(String) }
  def api_key
    self.class.api_key or raise "API key not set"
  end

  sig { returns(String) }
  def app_id
    self.class.app_id or raise "App ID not set"
  end

  sig { returns(String) }
  def number
    self.class.number or raise "Number not set"
  end

  sig { params(number: String, display_name: T.nilable(String)).returns(Call) }
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
