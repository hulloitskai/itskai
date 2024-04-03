# typed: strict
# frozen_string_literal: true

class SpotifyJamSession < T::Struct
  extend T::Sig

  # == Properties
  const :id, String
  const :join_url, String

  # == Methods
  sig { returns(SpotifyJamSession) }
  def self.current_or_activate
    SpotifyClient.retrieve_or_activate_jam_session
  end
end
