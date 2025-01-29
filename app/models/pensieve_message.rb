# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
# == Schema Information
#
# Table name: pensieve_messages
#
#  id                  :uuid             not null, primary key
#  edit_timestamp      :datetime
#  from                :string           not null
#  likes_count         :integer          default(0), not null
#  text                :text             not null
#  timestamp           :datetime         not null
#  to                  :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  telegram_chat_id    :bigint           not null
#  telegram_message_id :bigint           not null
#
# Indexes
#
#  index_pensieve_messages_on_timestamp  (timestamp)
#  index_pensieve_messages_on_to         (to)
#  index_pensieve_messages_uniqueness    (telegram_chat_id,telegram_message_id) UNIQUE
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class PensieveMessage < ApplicationRecord
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
  validate :validate_text_profanity

  # == Scopes
  scope :recent, -> {
    where("timestamp > ?", 1.day.ago).order(:timestamp).limit(100)
  }

  # == Likes
  sig { params(actor_id: String).returns(T::Boolean) }
  def liked_by?(actor_id:)
    likes.exists?(actor_id:)
  end

  sig do
    params(actor_id: String).returns(PensieveMessageLike)
  end
  def like!(actor_id:)
    likes.create!(actor_id:)
  end

  sig { params(actor_id: String).void }
  def unlike!(actor_id:)
    likes.find_by(actor_id:)&.destroy!
  end

  # == Methods
  sig { returns(T::Boolean) }
  def recent?
    PensieveMessage.recent.exists?(id:)
  end

  sig { void }
  def send!
    validate!
    raise "Can't send a message on behalf of a user" if from == :user

    raise NotImplementedError
    # telegram_message = PensieveBot.send_message(text)
    # update!(
    #   telegram_chat_id: telegram_message.chat.id,
    #   telegram_message_id: telegram_message.message_id,
    #   timestamp: Time.zone.at(telegram_message.date),
    # )
  end

  private

  # == Validators
  sig { void }
  def validate_text_profanity
    text = self.text.downcase
    if Badwords.current.any? { |word| text.include?(word) }
      errors.add(:text, "contains profanity")
    end
  end
end
