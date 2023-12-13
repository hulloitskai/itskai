# typed: strict
# frozen_string_literal: true

module Types
  class JourneysSessionParticipationType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :goal, String, null: false
    field :participant_is_viewer, Boolean, null: false
    field :participant_name, String, null: false
    field :session, [JourneysSessionType], null: false

    # == Resolvers
    sig { returns(T::Boolean) }
    def participant_is_viewer
      journeys_participant_id == object.participant_id
    end

    # == Helpers
    sig { override.returns(::Journeys::SessionParticipation) }
    def object = super
  end
end
