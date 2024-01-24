# typed: true
# frozen_string_literal: true

module Journeys
  class HomeController < ApplicationController
    # == Actions
    def show
      if (session = active_session)
        redirect_to(journeys_session_path(session))
      else
        render(inertia: "JourneysHomePage")
      end
    end

    private

    # == Helpers
    sig { returns(T.nilable(Journeys::Session)) }
    def active_session
      Session.active.find_by(
        participations: SessionParticipation.where(participant_id:),
      )
    end
  end
end
