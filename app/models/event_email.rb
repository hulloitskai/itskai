# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: event_emails
#
#  id         :uuid             not null, primary key
#  body       :text
#  subject    :string
#  timestamp  :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class EventEmail < ApplicationRecord
  # == Attachments
  has_many_attached :attachments
end
