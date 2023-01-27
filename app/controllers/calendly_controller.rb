# typed: true
# frozen_string_literal: true

class CalendlyController < ApplicationController
  # == Actions
  # GET /calendly, /hangout
  def show
    redirect_to(
      "https://calendly.com/hulloitskai/hangout",
      allow_other_host: true,
    )
  end
end
