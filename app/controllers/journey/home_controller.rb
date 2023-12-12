# typed: true
# frozen_string_literal: true

module Journey
  class HomeController < ApplicationController
    # == Filters
    before_action :set_active_session

    # == Actions
    def show
      if (session = @active_session)
        redirect_to(journey_session_path(session))
      else
        render(inertia: "JourneyHomePage")
      end
    end

    private

    # == Filter Handlers
    sig { void }
    def set_active_session
      @active_session = T.let(
        Session.active.find_by(
          participations: SessionParticipation.where(participant_id:),
        ),
        T.nilable(Session),
      )
    end
  end
end
