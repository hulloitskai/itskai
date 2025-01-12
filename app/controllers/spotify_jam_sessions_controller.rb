# typed: true
# frozen_string_literal: true

class SpotifyJamSessionsController < ApplicationController
  # == Actions
  # POST /spotify/jam_sessions/join
  def join
    @session = SpotifyJamSession.current_or_activate
    inertia_location(@session.join_url)
  end
end
