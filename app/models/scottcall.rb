# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: scottcalls
#
#  id                     :uuid             not null, primary key
#  message                :text             not null
#  created_at             :datetime         not null
#  telnyx_call_control_id :string           not null
#
# Indexes
#
#  index_scottcalls_on_telnyx_call_control_id  (telnyx_call_control_id) UNIQUE
#
class Scottcall < ApplicationRecord
  include Identifiable

  # == Validations
  validates :message, presence: true
end
