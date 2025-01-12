# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: statuses
#
#  id         :uuid             not null, primary key
#  emoji      :string
#  text       :text             not null
#  created_at :datetime         not null
#
# Indexes
#
#  index_statuses_on_created_at  (created_at)
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class Status < ApplicationRecord
  # == Validations
  validates :text, presence: true
end
