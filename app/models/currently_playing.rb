# typed: true
# frozen_string_literal: true

class CurrentlyPlaying < T::Struct
  extend T::Sig

  class << self
    extend T::Sig

    # == Polling
    sig { void }
    def poll = Poll.start

    sig { void }
    def unpoll = Poll.stop

    # == Methods
    sig { returns(T.nilable(CurrentlyPlaying)) }
    def current
      if (json = Rails.cache.fetch(value_key))
        CurrentlyPlaying.from_json(json)
      end
    end

    sig { params(value: T.nilable(CurrentlyPlaying)).void }
    def current=(value)
      Rails.cache.write(value_key, value.as_json)
      trigger_subscriptions(value)
    end

    private

    sig { returns(T.anything) }
    def value_key
      %i[currently_playing value]
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
