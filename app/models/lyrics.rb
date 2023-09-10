# typed: strict
# frozen_string_literal: true

class Lyrics < Array
  extend T::Sig
  extend T::Generic

  # == Annotations
  Elem = type_member { { fixed: LyricLine } }

  # == Methods
  sig { returns(T.nilable(String)) }
  def self.sp_dc
    ENV["LYRICS_SP_DC"]
  end

  sig { returns(String) }
  def self.sp_dc!
    sp_dc or raise "Lyrics SP DC not set"
  end

  sig { params(track_id: String).returns(T.nilable(Lyrics)) }
  def self.for_track(track_id)
    LyricsClient.retrieve_lyrics(track_id)
  end
end
