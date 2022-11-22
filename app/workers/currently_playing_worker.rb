# typed: strict
# frozen_string_literal: true

class CurrentlyPlayingWorker
  extend T::Sig

  @current_track = T.let(nil, T.untyped)
  @running_thread = T.let(nil, T.nilable(Thread))

  class << self
    extend T::Sig

    sig { void }
    def run
      # puts "running!"
      @running_thread ||=
        Thread.new do
          loop do
            # puts "updating!"
            update
            sleep(2)
          end
        end
    end

    sig { returns(T.nilable(RSpotify::Track)) }
    attr_reader :current_track

    private

    sig { void }
    def update
      track = SpotifyService.currently_playing_track
      should_update = track&.id != @current_track&.id
      @current_track = track
      update_subscriptions if should_update
    end

    sig { void }
    def update_subscriptions
      Schema.subscriptions!.trigger(:currently_playing, {}, @current_track)
    end
  end
end
