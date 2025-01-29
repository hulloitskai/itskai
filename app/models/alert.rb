# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
# == Schema Information
#
# Table name: alerts
#
#  id         :uuid             not null, primary key
#  body       :text             not null
#  title      :string           not null
#  created_at :datetime         not null
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class Alert < ApplicationRecord
  include Noticeable

  # == Methods
  sig { returns(Alert) }
  def self.test
    new(
      title: "Test notification",
      body: "This is a test notification. If you are seeing this, then your " \
        "push notifications are working!",
    )
  end

  # == Noticeable
  sig { override.returns(String) }
  def notification_title = title

  sig { override.returns(String) }
  def notification_body = body
end
