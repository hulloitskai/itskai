# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: notifications
#
#  id              :uuid             not null, primary key
#  delivered_at    :datetime
#  delivery_token  :string           not null
#  noticeable_type :string           not null
#  pushed_at       :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  friend_id       :uuid
#  noticeable_id   :uuid             not null
#
# Indexes
#
#  index_notifications_on_friend_id   (friend_id)
#  index_notifications_on_noticeable  (noticeable_type,noticeable_id)
#
# Foreign Keys
#
#  fk_rails_...  (friend_id => friends.id)
#
class NotificationSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes title: { type: :string },
             body: { type: :string },
             action_url: { type: :string, nullable: true },
             created_at: { as: :timestamp }

  # == Associations
  has_one :noticeable, serializer: NoticeableSerializer
end
