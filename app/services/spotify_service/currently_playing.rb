# typed: true
# frozen_string_literal: true

class SpotifyService
  class CurrentlyPlaying < T::Struct
    extend T::Sig

    # == Properties
    const :progress_milliseconds, Integer
    const :track, RSpotify::Track

    # == Methods
    sig { override.params(other: BasicObject).returns(T::Boolean) }
    def ==(other)
      case other
      when CurrentlyPlaying
        other.track.id == track.id &&
          other.progress_milliseconds == progress_milliseconds
      else
        super
      end
    end
  end
end
