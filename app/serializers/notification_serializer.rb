# typed: true
# frozen_string_literal: true

class NotificationSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes title: { type: :string },
             body: { type: :string },
             action_url: { type: :string, nullable: true }
  attribute :noticeable, type: "Noticeable" do
    serialize_noticeable(notification.noticeable!)
  end

  private

  sig { params(noticeable: Noticeable).returns(T::Hash[Symbol, T.untyped]) }
  def serialize_noticeable(noticeable)
    noticeable_hash = case noticeable
    when Alert
      { alert_id: noticeable.id }
    when ExplorationComment
      { comment_id: noticeable.id }
    when LocationAccess
      {
        access: LocationAccessSerializer.one(noticeable),
      }
    when FriendVibecheck
      {
        friend: FriendSerializer.one(noticeable.friend!),
        vibe: noticeable.vibe,
      }
    else
      raise "Unexpected noticeable type: #{noticeable.model_name}"
    end
    { type: noticeable.model_name.to_s, **noticeable_hash }
  end
end
