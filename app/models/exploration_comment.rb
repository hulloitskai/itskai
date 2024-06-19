# typed: true
# frozen_string_literal: true

# == Schema information
#
# Table name: exploration_comments
#
#  id             :uuid             not null, primary key
#  author_contact :string           not null
#  message        :text             not null
#  created_at     :datetime         not null
#  exploration_id :string           not null
#
# == Schema information
#
# Table name: exploration_comments
#
#  id             :uuid             not null, primary key
#  author_contact :string           not null
#  message        :text             not null
#  created_at     :datetime         not null
#  exploration_id :string           not null
#
class ExplorationComment < ApplicationRecord
  include Identifiable

  # == Associations
  sig { returns(Exploration) }
  def exploration
    Exploration.find(exploration_id)
  end

  # == Validations
  validates :message, :author_contact, presence: true

  # == Callbacks
  after_create_commit :send_notification

  private

  # == Callback handlers
  sig { void }
  def send_notification
    NotificationsBot.send_message(
      "New comment on '#{exploration.label}': #{message}",
    )
  end
end
