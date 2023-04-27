# typed: true
# frozen_string_literal: true

class CalendlyController < ApplicationController
  # == Actions
  # GET /calendly, /hangout
  def show
    redirect_to("https://cal.com/itskai", allow_other_host: true)
  end
end
