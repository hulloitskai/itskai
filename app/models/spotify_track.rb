# typed: strict
# frozen_string_literal: true

require "spotify"

class SpotifyTrack < RSpotify::Track
  extend T::Sig

  # == Methods
  sig { returns(T.nilable(T::Array[LyricLine])) }
  def lyrics
    SpotifyClient.retrieve_lyrics(id)
  end

  sig { returns(String) }
  def url
    external_urls.fetch("spotify")
  end
end
