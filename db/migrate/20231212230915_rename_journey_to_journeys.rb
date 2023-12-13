# typed: true
# frozen_string_literal: true

class RenameJourneyToJourneys < ActiveRecord::Migration[7.1]
  def change
    rename_table :journey_sessions, :journeys_sessions
    rename_table :journey_session_participations,
                 :journeys_session_participations
  end
end
