# typed: strict
# frozen_string_literal: true

module Mutations
  class LeaveJourneysSession < JourneysBaseMutation
    # == Fields
    field :session, Types::JourneysSessionType

    # == Arguments
    argument :participation_id,
             ID,
             loads: Types::JourneysSessionParticipationType

    # == Resolver
    sig do
      params(participation: Journeys::SessionParticipation)
        .returns({ session: Journeys::Session })
    end
    def resolve(participation:)
      authorize!(participation, to: :destroy?)
      session = participation.session!
      participation.destroy!
      { session: }
    end
  end
end
