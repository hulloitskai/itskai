# typed: strict
# frozen_string_literal: true

class CurrentlyPlaying < T::Struct
  extend T::Sig

  # == Constants
  CACHE_KEY = T.let(%i[currently_playing], T.anything)

  # == Attributes
  const :progress_milliseconds, Integer
  const :track, RSpotify::Track
  const :timestamp, Integer

  # == Current
  sig { returns(T.nilable(CurrentlyPlaying)) }
  def self.current
    if (json = Rails.cache.fetch(CACHE_KEY))
      CurrentlyPlaying.from_json(json)
    end
  end

  sig { params(currently_playing: T.nilable(CurrentlyPlaying)).void }
  def self.current=(currently_playing)
    Rails.cache.write(CACHE_KEY, currently_playing.as_json)
    record_listening_log(currently_playing) if currently_playing
    trigger_subscriptions(currently_playing)
  end

  sig { params(currently_playing: CurrentlyPlaying).void }
  private_class_method def self.record_listening_log(currently_playing)
    Thread.new do
      Rails.application.executor.wrap do
        ListeningLog.transaction do
          last_track_id = ListeningLog
            .reverse_chronological
            .pick(:spotify_track_id)
          if last_track_id != currently_playing.track.id
            ListeningLog.create!(spotify_track_id: currently_playing.track.id)
          end
        end
      end
    end
  end

  sig { params(currently_playing: T.nilable(CurrentlyPlaying)).void }
  private_class_method def self.trigger_subscriptions(currently_playing)
    Schema.subscriptions!.trigger(
      :currently_playing,
      {},
      currently_playing.as_json,
    )
  end

  # == Polling
  sig { void }
  def self.start_poll
    CurrentlyPlayingPoll.start
  end

  sig { void }
  def self.stop_poll
    CurrentlyPlayingPoll.stop
  end

  # == Serialization
  sig { params(json: T::Hash[String, T.untyped]).returns(CurrentlyPlaying) }
  def self.from_json(json)
    CurrentlyPlaying.new(
      progress_milliseconds: json.fetch("progress_milliseconds"),
      track: RSpotify::Track.new(json.fetch("track")),
      timestamp: json.fetch("timestamp"),
    )
  end

  # == Methods
  sig { override.params(other: BasicObject).returns(T::Boolean) }
  def ==(other)
    case other
    when CurrentlyPlaying
      other.timestamp == timestamp
    else
      super
    end
  end
end
