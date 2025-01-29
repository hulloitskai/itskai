# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: friend_vibechecks
#
#  id         :uuid             not null, primary key
#  vibe       :string           not null
#  created_at :datetime         not null
#  friend_id  :uuid             not null
#
# Indexes
#
#  index_friend_vibechecks_on_friend_id  (friend_id)
#
# Foreign Keys
#
#  fk_rails_...  (friend_id => friends.id)
#
class FriendVibecheckSerializer < ApplicationSerializer
  attributes :vibe, :created_at
end
