# typed: strict
# frozen_string_literal: true

module Mutations
  class LeaveJourneysSession < JourneysBaseMutation
    # == Payload
    class Payload < T::Struct
      const :session, Journeys::Session
    end

    # == Fields
    field :session, Types::JourneysSessionType

    # == Arguments
    argument :participation_id,
             ID,
             loads: Types::JourneysSessionParticipationType

    # == Resolver
    sig do
      params(
        participation: Journeys::SessionParticipation,
      ).returns(Payload)
    end
    def resolve(participation:)
      authorize!(participation, to: :destroy?)
      session = participation.session!
      participation.destroy!
      Payload.new(session:)
    end
  end
end
