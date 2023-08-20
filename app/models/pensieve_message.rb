# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: pensieve_messages
#
#  id                  :uuid             not null, primary key
#  edit_timestamp      :datetime
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

  sig { returns(T::Boolean) }
  def edited? = edit_timestamp?

  # == Validations
  validates :text, presence: true

  # == Callbacks
  after_commit :trigger_subscriptions, on: %i[create update]

  private

  # == Callback Handlers
  sig { void }
  def trigger_subscriptions
    Schema.subscriptions!.trigger(:pensieve_message, {}, self)
  end
end
