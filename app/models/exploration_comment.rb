# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
# == Schema Information
#
# Table name: exploration_comments
#
#  id             :uuid             not null, primary key
#  author_contact :string           not null
#  message        :text             not null
#  created_at     :datetime         not null
#  exploration_id :string           not null
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class ExplorationComment < ApplicationRecord
  include Noticeable

  # == Attributes
  sig { returns(String) }
  def message_snippet
    message.truncate(240)
  end

  # == Associations
  has_one :notification, as: :noticeable, dependent: :destroy

  sig { returns(Exploration) }
  def exploration
    Exploration.find(exploration_id)
  end
  delegate :label, to: :exploration, prefix: true

  # == Validations
  validates :message, :author_contact, presence: true

  # == Callbacks
  after_create :create_notification!

  # == Noticeable
  sig do
    override
      .params(recipient: T.nilable(Friend))
      .returns(T::Hash[String, T.untyped])
  end
  def notification_payload(recipient)
    ExplorationCommentNotificationPayloadSerializer.one(self)
  end
end
