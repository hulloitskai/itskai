# typed: true
# frozen_string_literal: true

module Admin
  class FriendsController < AdminController
    # == Configuration
    respond_to :html, :json

    # == Actions
    # GET /admin/friends
    def index
      friends = authorized_scope(Friend.all)
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
