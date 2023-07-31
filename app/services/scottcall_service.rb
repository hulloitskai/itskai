# typed: true
# frozen_string_literal: true

class ScottcallService < ApplicationService
  class << self
    # == Lifecycle
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = TelnyxService.disabled? || number.nil? || super
    end

    # == Settings
    sig { returns(T.nilable(String)) }
    def number
      setting("NUMBER")
    end

    # == Methods
    sig { params(type: Symbol).void }
    def dial(type)
      checked { instance.dial(type) }
    end

    sig { params(telnyx_call_control_id: String).void }
    def respond(telnyx_call_control_id)
      checked { instance.respond(telnyx_call_control_id) }
    end
  end

  # == Lifecycle
  sig { override.returns(T::Boolean) }
  def ready?
    TelnyxService.ready? && super
  end

  # == Settings
  sig { returns(String) }
  def number
    self.class.number or raise "Number not set"
  end

  # == Methods
  sig { params(signal: Symbol).void }
  def dial(signal)
    message = case signal
    when :break
      "Scott is caught in an unproductive cycle and would like to exit it!"
    when :rand
      "Scott wants to experience something new!"
    when :panic
      "Something has not gone to plan for Scott in a major way!"
    else
      raise "Unknown type: #{signal}"
    end
    call = TelnyxService.dial(number, display_name:)
    Scottcall.create!(telnyx_call_control_id: call.control_id, message:)
  end

  sig { params(telnyx_call_control_id: String).void }
  def respond(telnyx_call_control_id)
    call = Scottcall.find_by!(telnyx_call_control_id:)
    TelnyxService.speak(telnyx_call_control_id, call.message)
  end

  private

  # == Helpers
  sig { returns(String) }
  def display_name
    @display_name = T.let(@display_name, T.nilable(String))
    @display_name ||= T.must(self.class.name).delete_suffix("Service")
  end
end
