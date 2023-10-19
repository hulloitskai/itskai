# typed: strict
# frozen_string_literal: true

require "google"

class Event < T::Struct
  extend T::Sig

  class << self
    extend T::Sig

    # == Helpers
    sig { returns(String) }
    def calendar_id
      ENV["EVENT_CALENDAR_ID"] or raise "Missing events calendar ID"
    end

    sig { returns(Google::Calendar) }
    def calendar
      @calendar ||= T.let(
        scoped do
          client_id = Google.client_id!
          client_secret = Google.client_secret!
          refresh_token = begin
            OAuthCredentials.google!.refresh_token
          rescue ActiveRecord::RecordNotFound
            raise "Missing Google OAuth credentials"
          end
          Google::Calendar.new(
            client_id:,
            client_secret:,
            refresh_token:,
            redirect_url: "urn:ietf:wg:oauth:2.0:oob",
            calendar: calendar_id,
          )
        end,
        T.nilable(Google::Calendar),
      )
    end

    # == Finders
    sig { returns(T::Array[Event]) }
    def recent
      events = calendar.find_events_in_range(
        1.day.ago,
        1.day.from_now,
        max_results: 50,
      )
      events.filter_map do |event|
        unless event.raw["transparency"] == "transparent"
          build_from_google_event(event)
        end
      end
    end

    private

    # == Helpers
    sig { params(event: Google::Event).returns(Event) }
    def build_from_google_event(event)
      new(
        id: event.id,
        url: event.html_link,
        title: event.title,
        description: event.description,
        start: event.start_time.to_time,
        end: event.end_time.to_time,
      )
    end
  end

  # == Properties
  const :id, String
  const :url, String
  const :title, String
  const :description, T.nilable(String)
  const :start, Time
  const :end, Time
end
