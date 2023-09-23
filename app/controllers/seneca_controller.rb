# typed: true
# frozen_string_literal: true

class SenecaController < ApplicationController
  TIME_ZONE = ActiveSupport::TimeZone.new("America/Vancouver")
  KNOWN_SINCE = Time.new(2023, 9, 10, 12, 0, 0, TIME_ZONE.utc_offset)

  def show
    @known_for = TimeDifference.between(KNOWN_SINCE, Time.current)
    @known_days = @known_for.in_days.to_i
    @known_hours = @known_for.in_general[:hours].to_i
    render("show", formats: :text)
  end
end
