# typed: strict
# frozen_string_literal: true

class CurrentlyPlaying < T::Struct
  extend T::Sig

  class << self
    extend T::Sig

    # == Current
    sig { returns(T.nilable(CurrentlyPlaying)) }
    def current
      if (json = Rails.cache.fetch(current_key))
        CurrentlyPlaying.from_json(json)
      end
    end

    sig { params(currently_playing: T.nilable(CurrentlyPlaying)).void }
    def current=(currently_playing)
      Rails.cache.write(current_key, currently_playing.as_json)
      trigger_subscriptions(currently_playing)
    end

    # == Methods
    sig { void }
    def start_poll
      Poll.start
    end

    sig { void }
    def stop_poll
      Poll.stop
    end

    private

    sig { returns(T.anything) }
    def current_key
      %i[currently_playing current]
    end

    sig { params(currently_playing: T.nilable(CurrentlyPlaying)).void }
    def trigger_subscriptions(currently_playing)
      Schema.subscriptions!.trigger(
        :currently_playing,
        {},
        currently_playing.as_json,
      )
    end
  end

  # == Attributes
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

  # == Serialization
  sig { params(json: T::Hash[String, T.untyped]).returns(CurrentlyPlaying) }
  def self.from_json(json)
    CurrentlyPlaying.new(
      progress_milliseconds: json.fetch("progress_milliseconds"),
      track: RSpotify::Track.new(json.fetch("track")),
    )
  end
end
