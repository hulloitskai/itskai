# typed: true
# frozen_string_literal: true

class SenecaController < ApplicationController
  TIME_ZONE = ActiveSupport::TimeZone.new("America/Vancouver")
  WHEN_WE_MET = Time.new(2023, 9, 10, 12, 0, 0, TIME_ZONE.utc_offset)
  LAST_INCIDENT = Time.new(2023, 10, 9, 11, 30, 0, TIME_ZONE.utc_offset)

  def show
    render(inertia: "SenecaPage", props: {
      "whenWeMet" => WHEN_WE_MET.iso8601,
      "lastIncident" => LAST_INCIDENT.iso8601,
    })
  end
end
