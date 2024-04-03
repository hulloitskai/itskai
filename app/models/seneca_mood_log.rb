# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: seneca_mood_logs
#
#  id         :uuid             not null, primary key
#  valence    :integer          not null
#  created_at :datetime         not null
#
class SenecaMoodLog < ApplicationRecord
  # == Validations
  validates :valence, numericality: { in: 1..10 }

  # == Callbacks
  after_create_commit :send_notification

  private

  # == Callback Handlers
  sig { void }
  def send_notification
    NotificationsBot.send_message("Seneca rated her mood #{valence}/10")
  end
end
