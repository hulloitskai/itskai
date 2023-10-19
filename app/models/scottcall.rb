# typed: strict
# frozen_string_literal: true

require "owner"

# == Schema Information
#
# Table name: scottcalls
#
#  id                     :uuid             not null, primary key
#  signal                 :string           not null
#  created_at             :datetime         not null
#  telnyx_call_control_id :string           not null
#
# Indexes
#
#  index_scottcalls_on_telnyx_call_control_id  (telnyx_call_control_id) UNIQUE
#
class Scottcall < ApplicationRecord
  include Identifiable

  # == Attributes
  enumerize :signal, in: %i[break rand panic]

  # == Methods
  sig { returns(String) }
  def self.contact_phone
    Owner.phone!
  end

  sig do
    params(signal: T.any(Symbol, String, Enumerize::Value)).returns(Scottcall)
  end
  def self.dial!(signal)
    call = TelnyxClient.dial(
      contact_phone,
      display_name: self.class.name,
    )
    create!(signal:, telnyx_call_control_id: call.control_id)
  end

  sig { void }
  def respond
    TelnyxClient.speak(telnyx_call_control_id, message)
  end

  sig { returns(String) }
  def message
    signal = self.signal.to_sym
    case signal
    when :break
      "Scott is caught in an unproductive cycle and would like to exit it!"
    when :rand
      "Scott wants to experience something new!"
    when :panic
      "Something has not gone to plan for Scott in a major way!"
    else
      raise "Unknown signal: #{signal}"
    end
  end
end
