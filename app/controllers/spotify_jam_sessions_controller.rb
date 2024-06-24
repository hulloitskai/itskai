# typed: true
# frozen_string_literal: true

class SpotifyJamSessionsController < ApplicationController
  # == Actions
  def join
    authorize!(to: :activate?, with: SpotifyJamSessionPolicy)
    @session = SpotifyJamSession.current_or_activate
    inertia_location(@session.join_url)
  end
end
