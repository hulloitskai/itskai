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

  # == Associations
  has_one :notification, as: :noticeable, dependent: :destroy

  sig { returns(Exploration) }
  def exploration
    Exploration.find(exploration_id)
  end

  # == Validations
  validates :message, :author_contact, presence: true

  # == Callbacks
  after_create :create_notification!

  # == Noticeable
  sig { override.returns(String) }
  def notification_title
    "New comment on \"#{exploration.label}\""
  end

  sig { override.returns(String) }
  def notification_body
    message
  end

  sig { override.params(notification: Notification).returns(T.nilable(String)) }
  def notification_action_url(notification)
    Rails.application.routes.url_helpers.admin_exploration_comments_path
  end
end
