# typed: strict
# frozen_string_literal: true

class CalendlyController < ApplicationController
  extend T::Sig

  # GET /calendly, /hangout
  sig { void }
  def show
    redirect_to(
      "https://calendly.com/hulloitskai/hangout",
      allow_other_host: true,
    )
  end
end
