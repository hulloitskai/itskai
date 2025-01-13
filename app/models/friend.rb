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
  validates :emoji, presence: true, emoji: true

  # == Associations
  has_many :push_subscriptions, dependent: :destroy
  has_many :vibechecks, class_name: "FriendVibecheck", dependent: :destroy
end
