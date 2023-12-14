# typed: strict
# frozen_string_literal: true

module Mutations
  class JourneysBaseMutation < BaseMutation
    # == Authorization
    authorize :participant_id, through: :journeys_participant_id
  end
end
