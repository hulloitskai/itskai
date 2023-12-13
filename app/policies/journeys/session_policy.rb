# typed: true
# frozen_string_literal: true

module Journeys
  class SessionPolicy < ApplicationPolicy
    # == Rules
    def index? = false

    def show?
      session = T.let(record, Session)
      session.participations.exists?(participant_id:)
    end
  end
end
