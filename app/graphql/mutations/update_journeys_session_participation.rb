# typed: strict
# frozen_string_literal: true

module Mutations
  class UpdateJourneysSessionParticipation < JourneysBaseMutation
    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :participation, Types::JourneysSessionParticipationType

    # == Arguments
    argument :goal, String
    argument :participant_name, String
    argument :participation_id,
             ID,
             loads: Types::JourneysSessionParticipationType

    # == Resolver
    sig do
      params(
        participation: Journeys::SessionParticipation,
        attributes: T.untyped,
      ).returns(T.any(
        { participation: Journeys::SessionParticipation },
        { errors: InputFieldErrors },
      ))
    end
    def resolve(participation:, **attributes)
      authorize!(participation, to: :update?)
      if participation.update(**attributes)
        { participation: }
      else
        { errors: participation.input_field_errors }
      end
    end
  end
end
