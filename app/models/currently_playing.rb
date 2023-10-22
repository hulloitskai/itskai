# typed: strict
# frozen_string_literal: true

class CurrentlyPlaying < T::Struct
  extend T::Sig

  # == Constants
  CACHE_KEY = T.let(%i[currently_playing], T.anything)

  # == Attributes
  const :progress_milliseconds, Integer
  const :track, RSpotify::Track
  const :timestamp, Time

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
    Schema.subscriptions!.trigger(:currently_playing, {}, nil)
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

  # == Serialization
  sig { params(json: T::Hash[String, T.untyped]).returns(CurrentlyPlaying) }
  def self.from_json(json)
    track_data = T.cast(json.fetch("track"), T::Hash[String, T.untyped])
    track = RSpotify::Track.new(track_data)
    timestamp_iso = T.cast(json.fetch("timestamp"), String)
    timestamp = Time.zone.parse(timestamp_iso)
    progress_milliseconds = T.cast(json.fetch("progress_milliseconds"), Integer)
    CurrentlyPlaying.new(track:, progress_milliseconds:, timestamp:)
  end

  # == Methods
  sig { override.params(other: BasicObject).returns(T::Boolean) }
  def ==(other)
    case other
    when CurrentlyPlaying
      track.id == other.track.id &&
        progress_milliseconds == other.progress_milliseconds
    else
      super
    end
  end
end
