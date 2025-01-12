# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: friends
#
#  id         :uuid             not null, primary key
#  emoji      :string           not null
#  name       :string           not null
#  token      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_friends_on_name   (name) UNIQUE
#  index_friends_on_token  (token) UNIQUE
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class Friend < ApplicationRecord
  # == Attributes
  has_secure_token :token

  # == Validations
  validates :name, presence: true, uniqueness: true
  validate :validate_emoji

  # == Associations
  has_many :push_subscriptions, dependent: :destroy

  private

  # == Validators
  # Validate that `emoji' is a single valid emoji.
  sig { void }
  def validate_emoji
    emoji = T.let(self[:emoji], T.nilable(String))
    unless emoji &&
        (matches = emoji.match(Unicode::Emoji::REGEX)) &&
        (matches.length == 1) &&
        (only_match = matches[0]) &&
        (only_match.length == emoji.length)
      errors.add(:emoji, :invalid)
    end
  end
end
