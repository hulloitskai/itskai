# typed: true
# frozen_string_literal: true

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
class FriendSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes :name, :emoji, notifiable?: { as: :notifiable, type: :boolean }
end
