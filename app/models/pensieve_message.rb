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

  # == Associations
  has_many :likes,
           class_name: "PensieveMessageLike",
           inverse_of: :message,
           foreign_key: :message_id,
           dependent: :destroy

  # == Validations
  validates :text, presence: true
  validates :from, presence: true

  # == Callbacks
  after_commit :trigger_subscriptions, on: %i[create update]

  # == Likes
  sig { params(session: ActionDispatch::Request::Session).returns(T::Boolean) }
  def liked_by?(session)
    likes.exists?(session_id: session.id.to_s)
  end

  sig do
    params(session: ActionDispatch::Request::Session)
      .returns(PensieveMessageLike)
  end
  def like!(session:)
    likes.create!(session_id: session.id.to_s)
  end

  sig { params(session: ActionDispatch::Request::Session).void }
  def unlike!(session:)
    likes.find_by(session_id: session.id.to_s)&.destroy!
  end

  # == Methods
  sig { void }
  def send!
    validate!
    raise "Can't send a message on behalf of a user" if from == :user
    telegram_message = Pensieve.send_message(text)
    update!(
      telegram_message_id: telegram_message.message_id,
      timestamp: Time.zone.at(telegram_message.date),
    )
  end

  private

  # == Callback Handlers
  sig { void }
  def trigger_subscriptions
    Schema.subscriptions!.trigger(:pensieve_message, {}, self)
  end
end
