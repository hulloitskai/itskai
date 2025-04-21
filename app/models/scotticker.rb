# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
# == Schema Information
#
# Table name: scottickers
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_scottickers_on_name  (name) UNIQUE
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class Scotticker < ApplicationRecord
  # == Attachments
  has_one_attached :image

  # == Validations
  validates :name, :image, presence: true
  validates :name, uniqueness: true
end
