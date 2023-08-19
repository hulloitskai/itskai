# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: pensieve_messages
#
#  id                  :uuid             not null, primary key
#  from                :string           not null
#  text                :text             not null
#  timestamp           :datetime         not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  telegram_message_id :bigint           not null
#
# Indexes
#
#  index_pensieve_messages_on_telegram_message_id  (telegram_message_id) UNIQUE
#
class PensieveMessage < ApplicationRecord
  include Identifiable

  # == Attributes
  enumerize :from, in: %i[user bot]

  # == Validations
  validates :text, presence: true
end
