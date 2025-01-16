# typed: true
# frozen_string_literal: true

module Admin
  class FriendsController < AdminController
    # == Configuration
    respond_to :html, :json

    # == Actions
    # GET /admin/friends
    def index
      friends = authorized_scope(Friend.all).includes(:push_subscriptions)
      latest_vibecheck_by_friend_id = FriendVibecheck
        .select("DISTINCT ON (friend_id) #{FriendVibecheck.table_name}.*")
        .order(:friend_id, created_at: :desc)
        .index_by(&:friend_id)
      friends = friends.map do |friend|
        latest_vibecheck = latest_vibecheck_by_friend_id.fetch(friend.id, nil)
        AdminFriend.new(friend:, latest_vibecheck:)
      end
      friends.sort_by! do |friend|
        time = friend.latest_vibecheck&.created_at || friend.created_at
        -time.to_i
      end
      respond_to do |format|
        format.html do
          render(inertia: "AdminFriendsPage", props: {
            friends: AdminFriendSerializer.many(friends),
          })
        end
        format.json do
          render(json: {
            friends: AdminFriendSerializer.many(friends),
          })
        end
      end
    end

    # POST /admin/friends
    def create
      friend_params = params.require(:friend).permit(:name, :emoji)
      friend = Friend.new(friend_params)
      if friend.save
        render(json: {}, status: :created)
      else
        render(
          json: { errors: friend.form_errors },
          status: :unprocessable_entity,
        )
      end
    end
  end
end
