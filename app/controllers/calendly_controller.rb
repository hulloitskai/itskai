# typed: true
# frozen_string_literal: true

class CalendlyController < ApplicationController
  # == Actions
  # GET /calendly, /hangout
  def show
    redirect_to("https://cal.com/itskai", allow_other_host: true)
  end

  # GET /calendly/:handle
  def event
    handle = T.let(params.fetch("handle"), String)
    redirect_to("https://cal.com/itskai/#{handle}", allow_other_host: true)
  end
end
