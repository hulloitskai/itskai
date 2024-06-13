# typed: true
# frozen_string_literal: true

class RemoveJourneys < ActiveRecord::Migration[7.1]
  def change
    drop_table :journeys_session_participations
    drop_table :journeys_sessions
  end
end
