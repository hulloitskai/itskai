# typed: true
# frozen_string_literal: true

class CurrentlyPlaying
  class Poll
    include Concurrent
    include Logging

    # == Variables
    @task = T.let(@task, T.nilable(TimerTask))

    class << self
      extend T::Sig
      include Concurrent

      # == Methods
      sig { void }
      def start
        stop
        @task = TimerTask.new(execution_interval: 4) do
          Rails.application.reloader.wrap do
            update
          end
        end
        @task.execute
      end

      sig { void }
      def stop
        if (task = @task)
          task.kill if task.running?
          @task = nil
        end
      end

      private

      sig { returns(T::Boolean) }
      def update
        value = SpotifyService.retrieve_currently_playing
        if value != CurrentlyPlaying.current
          CurrentlyPlaying.current = value
          tag_logger do
            if value.present?
              logger.info(
                "Currently playing: #{value.track.name} " \
                  "(#{value.progress_milliseconds}ms)",
              )
            else
              logger.info("Stopped playing")
            end
          end
          true
        else
          false
        end
      rescue => error
        tag_logger { logger.error("Error: #{error}") }
        Rails.error.report(error, handled: true)
        false
      end
    end
  end
end
