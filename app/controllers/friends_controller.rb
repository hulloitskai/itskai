# typed: true
# frozen_string_literal: true

class FriendsController < ApplicationController
  # == Filters
  before_action :authenticate_friend!

  # == Actions
  # GET /friend?friend_token=...
  def show
    friend = authenticate_friend!
    statuses = authorized_scope(Status.all)
      .reverse_chronological
      .limit(5)
    contact_phone = Contact.phone
    emulate_standalone = params[:emulate_standalone].truthy?
    vibe_last_checked_at = friend.vibechecks.chronological.last&.created_at
    render(inertia: "FriendPage", props: {
      friend: FriendSerializer.one(friend),
      "friendToken" => friend.token,
      "contactPhone" => contact_phone,
      "emulateStandalone" => emulate_standalone,
      "vibeLastCheckedAt" => vibe_last_checked_at,
      statuses: StatusSerializer.many(statuses),
    })
  end

  # GET /friend/manifest.webmanifest?friend_token=...
  def manifest
    friend = authenticate_friend!
    render(json: {
      name: "it's kai - friendship portal",
      short_name: "it's kai",
      description: "experiments with friends :)",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      display: "standalone",
      start_url: friend_path(friend_token: friend.token),
    })
  end

  # POST /friend/vibecheck?friend_token=...
  def vibecheck
    friend = authenticate_friend!
    vibecheck_params = params.require(:vibecheck).permit(:vibe)
    vibecheck = friend.vibechecks.build(vibecheck_params)
    if vibecheck.save
      render(json: {}, status: :created)
    else
      render(
        json: { errors: vibecheck.form_errors },
        status: :unprocessable_entity,
      )
    end
  end
end
