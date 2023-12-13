# typed: strict
# frozen_string_literal: true

module Queries
  class JourneysBaseQuery < BaseQuery
    # == Authorization
    authorize :participant_id, through: :journeys_participant_id
  end
end
